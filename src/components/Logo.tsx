type Props = { size?: number }

// Inline SVG mark: a wok bowl, rising steam, and crossed chopsticks.
export default function Logo({ size = 34 }: Props) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#FE5D26" />
        <rect x="34" y="10" width="3.4" height="26" rx="1.7" transform="rotate(18 35.7 23)" fill="#F2C078" />
        <rect x="40" y="10" width="3.4" height="26" rx="1.7" transform="rotate(28 41.7 23)" fill="#F2C078" />
        <path d="M12 30 h40 a20 20 0 0 1 -40 0 Z" fill="#C1DBB3" />
        <path d="M12 30 h40 a20 20 0 0 1 -40 0 Z" fill="none" stroke="#7EBC89" strokeWidth="2.5" />
        <path d="M26 24 q3 -4 0 -8" fill="none" stroke="#F2C078" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M34 24 q3 -4 0 -8" fill="none" stroke="#F2C078" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: size * 0.62,
          letterSpacing: '-0.01em',
          color: 'var(--ink)',
        }}
      >
        Wok<span style={{ color: 'var(--coral)' }}>Wise</span>
      </span>
    </span>
  )
}
