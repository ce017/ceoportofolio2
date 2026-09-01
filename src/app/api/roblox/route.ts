import { NextResponse } from 'next/server'

const USER_ID = '2044086853'

export const revalidate = 1800 // 30 min cache

export async function GET() {
  try {
    const [userRes, avatarRes] = await Promise.all([
      fetch(`https://users.roblox.com/v1/users/${USER_ID}`, {
        next: { revalidate: 1800 },
      }),
      fetch(
        `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${USER_ID}&size=150x150&format=Png&isCircular=true`,
        { next: { revalidate: 1800 } }
      ),
    ])

    if (!userRes.ok || !avatarRes.ok) {
      throw new Error('Roblox API responded with error')
    }

    const user = await userRes.json()
    const avatarData = await avatarRes.json()
    const avatarUrl = avatarData?.data?.[0]?.imageUrl ?? null

    return NextResponse.json({
      id: USER_ID,
      displayName: user.displayName,
      username: user.name,
      created: user.created,
      avatarUrl,
      profileUrl: `https://www.roblox.com/users/${USER_ID}/profile`,
    })
  } catch {
    return NextResponse.json(
      {
        id: USER_ID,
        displayName: 'Ceo',
        username: 'ceo2000_8',
        avatarUrl: null,
        profileUrl: `https://www.roblox.com/users/${USER_ID}/profile`,
      },
      { status: 200 }
    )
  }
}
