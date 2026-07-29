"""
Presence agent for the ce-17 portfolio activity widget.

Watches this PC for Roblox Studio and Claude and pushes what it finds to the
`portfolio_presence` row in Supabase. The website reads that row with the same
public key; writing additionally requires the shared secret below, enforced by a
row-level-security policy. The Supabase service-role key is never used here.

Setup (already done on this machine):
  1. pip install psutil pywin32 requests
  2. setx PORTFOLIO_PRESENCE_SECRET "<secret>"     (open a NEW terminal after)
  3. pythonw presence-agent.py

Autostart: a shortcut in  shell:startup  runs this with pythonw (no console).

If the secret ever leaks, rotate it by editing the RLS policy
`portfolio_presence_agent_write` in Supabase and re-running step 2.
"""

import os
import re
import sys
import json
import time
import datetime as dt

import psutil
import requests

try:
    import win32gui
    import win32process
except ImportError:
    win32gui = None
    win32process = None

SUPABASE_URL = "https://hrdvikkafvvfwgwvrdzz.supabase.co"
TABLE = "portfolio_presence"

# Public (publishable) key — same one the website ships, safe to keep here.
PUBLIC_KEY = "sb_publishable_5YFQeAXAdkXc1Q35cIOsgQ_ofmp9HHe"
# The write secret lives in the environment, not in this file.
SECRET = os.environ.get("PORTFOLIO_PRESENCE_SECRET", "").strip()

POLL_SECONDS = 20

# process name -> (kind, title shown on the site)
WATCHED = {
    "robloxstudiobeta.exe": ("roblox", "On Roblox Studio"),
    "windowsstudiobeta.exe": ("roblox", "On Roblox Studio"),
    "claude.exe": ("claude", "Using Claude"),
}

# Studio titles its window "<PlaceName> - Roblox Studio".
STUDIO_TITLE = re.compile(r"^\s*(.+?)\s*[-–]\s*Roblox Studio\s*$", re.I)


def window_titles_by_pid():
    """Map pid -> list of visible window titles (Windows only)."""
    out = {}
    if not win32gui:
        return out

    def cb(hwnd, _):
        if not win32gui.IsWindowVisible(hwnd):
            return
        title = win32gui.GetWindowText(hwnd)
        if not title:
            return
        try:
            _, pid = win32process.GetWindowThreadProcessId(hwnd)
        except Exception:
            return
        out.setdefault(pid, []).append(title)

    try:
        win32gui.EnumWindows(cb, None)
    except Exception:
        pass
    return out


def collect():
    titles = window_titles_by_pid()
    found = {}

    for proc in psutil.process_iter(["name", "pid", "create_time"]):
        try:
            name = (proc.info["name"] or "").lower()
            pid = proc.info["pid"]
            created = proc.info["create_time"]
        except Exception:
            continue
        if name not in WATCHED:
            continue

        kind, title = WATCHED[name]
        started_ms = int(created * 1000)

        detail = None
        for t in titles.get(pid, []):
            if kind == "roblox":
                m = STUDIO_TITLE.match(t)
                if m:
                    detail = m.group(1).strip().lstrip("*").strip()
                    break
            elif kind == "claude":
                if t and t.strip().lower() != "claude":
                    detail = t.strip()
                    break

        prev = found.get(kind)
        if prev is None:
            found[kind] = {
                "key": kind, "kind": kind, "title": title,
                "detail": detail, "since": started_ms,
            }
        else:
            # Multiple windows of the same app: keep the earliest start so
            # "since" reflects the session, and keep any detail we managed to read.
            prev["since"] = min(prev["since"], started_ms)
            if detail and not prev.get("detail"):
                prev["detail"] = detail

    result = []
    for item in found.values():
        if not item.get("detail"):
            item.pop("detail", None)
        result.append(item)
    return result


def push(payload):
    res = requests.patch(
        f"{SUPABASE_URL}/rest/v1/{TABLE}",
        params={"id": "eq.1"},
        headers={
            "apikey": PUBLIC_KEY,
            "x-presence-secret": SECRET,
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
        json={
            "payload": payload,
            "updated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
        },
        timeout=20,
    )
    # RLS returns 200 with an empty list when the secret is wrong: the row is
    # simply invisible to the update, so treat that as a failure, not success.
    if res.ok and res.text.strip() in ("[]", ""):
        return False, "rejected by RLS - is PORTFOLIO_PRESENCE_SECRET correct?"
    return res.ok, f"{res.status_code} {res.text[:160]}"


def main():
    if not SECRET:
        print("PORTFOLIO_PRESENCE_SECRET is not set. Open a new terminal after setx.")
        return 1
    if win32gui is None:
        print("pywin32 missing - apps will still show, but without place names.")

    print("presence agent running; ctrl-c to stop")
    last = None
    while True:
        try:
            payload = collect()
            # Always write, even when unchanged: the site treats a row older than
            # 90s as "PC is off", so the heartbeat is what keeps cards alive.
            ok, info = push(payload)
            summary = json.dumps(payload, sort_keys=True)
            if summary != last or not ok:
                print(f"[{time.strftime('%H:%M:%S')}] {'ok  ' if ok else 'FAIL'} {summary}")
                if not ok:
                    print(f"           {info}")
                last = summary
        except KeyboardInterrupt:
            print("stopped")
            return 0
        except Exception as exc:
            print(f"error: {exc}")
        time.sleep(POLL_SECONDS)


if __name__ == "__main__":
    sys.exit(main())
