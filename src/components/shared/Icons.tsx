interface IconProps {
  className?: string
  size?: number
}

// DocumentEye — for "Transparentné správy"
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

// CoinStack — for "Hlas pri rozpočte"
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

// ChevronDown
export function ChevronDown({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

// ExternalLink
export function ExternalLink({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

// Mail
export function Mail({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

// Camera / Instagram
export function Camera({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  )
}

// MessageCircle / WhatsApp
export function MessageCircle({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
    </svg>
  )
}

// Menu (hamburger)
export function Menu({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

// X (close)
export function X({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

// Quote
export function Quote({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
    </svg>
  )
}

// Fly / Mucha — decorative
export function FlyIcon({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <ellipse cx="16" cy="17" rx="3" ry="5.5" fill="currentColor" opacity="0.9"/>
      <circle cx="16" cy="10" r="3" fill="currentColor" opacity="0.9"/>
      <circle cx="14.5" cy="9" r="1.1" fill="white" opacity="0.8"/>
      <circle cx="17.5" cy="9" r="1.1" fill="white" opacity="0.8"/>
      <ellipse cx="9.5" cy="14" rx="6" ry="2.8" fill="currentColor" opacity="0.2" transform="rotate(-15 9.5 14)"/>
      <ellipse cx="9" cy="18" rx="4.5" ry="2" fill="currentColor" opacity="0.15" transform="rotate(-10 9 18)"/>
      <ellipse cx="22.5" cy="14" rx="6" ry="2.8" fill="currentColor" opacity="0.2" transform="rotate(15 22.5 14)"/>
      <ellipse cx="23" cy="18" rx="4.5" ry="2" fill="currentColor" opacity="0.15" transform="rotate(10 23 18)"/>
    </svg>
  )
}
