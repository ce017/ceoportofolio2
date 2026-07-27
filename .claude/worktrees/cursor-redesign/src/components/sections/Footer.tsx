export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #1f1f1f',
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#0a0a0a',
      }}
    >
      <span style={{ color: '#777', fontSize: '11px' }}>
        © {new Date().getFullYear()} Ceo&apos;s Portfolio
      </span>
      <span style={{ color: '#777', fontSize: '11px' }}>
        Built with Next.js
      </span>
    </footer>
  )
}
