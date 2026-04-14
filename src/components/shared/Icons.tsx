interface IconProps {
  className?: string
  size?: number
}

// DocumentEye — for "Transparentné správy" (document + eye symbol)
export function DocumentEye({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <circle cx="12" cy="14" r="2"/>
      <path d="M8 14s1.5-3 4-3 4 3 4 3-1.5 3-4 3-4-3-4-3z"/>
    </svg>
  )
}

// CoinStack — for "Hlas pri rozpočte" (coins/budget)
export function CoinStack({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="8" rx="8" ry="3"/>
      <path d="M4 8v4c0 1.66 3.58 3 8 3s8-1.34 8-3V8"/>
      <path d="M4 12v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4"/>
    </svg>
  )
}

// ChatBubbleHeart — for "Otvorený kanál podnetov"
export function ChatBubbleHeart({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      <path d="M12 9c0-.5-.4-1-1-1s-2 .6-2 2c0 2 3 4 3 4s3-2 3-4c0-1.4-1-2-2-2s-1 .5-1 1z"/>
    </svg>
  )
}

// Scales — for "Férovejší skúšobný poriadok"
export function Scales({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="3" x2="12" y2="21"/>
      <path d="M3 6l9 3 9-3"/>
      <path d="M6 6l-3 6a3 3 0 006 0z"/>
      <path d="M18 6l3 6a3 3 0 01-6 0z"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
    </svg>
  )
}

// ScreenCode — for "Lepšie digitálne nástroje"
export function ScreenCode({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
      <path d="M9 8l-2 2 2 2M15 8l2 2-2 2"/>
    </svg>
  )
}

// PeopleTalk — for "Verejné Q&A každý semester"
export function PeopleTalk({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="7" r="3"/>
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
      <path d="M21 21v-2a4 4 0 00-3-3.85"/>
    </svg>
  )
}
