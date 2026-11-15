export function BrandMark({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="33"
        height="33"
        rx="8"
        stroke="currentColor"
        strokeOpacity="0.34"
        strokeWidth="1.25"
      />
      <path
        d="M9.5 27.5V16.5C9.5 11.806 13.306 8 18 8C22.694 8 26.5 11.806 26.5 16.5V27.5"
        stroke="#E3C67C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.5 26L18 14L22.5 26"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1 22H20.9"
        stroke="#E3C67C"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="18" cy="10.8" r="1.15" fill="#E3C67C" />
    </svg>
  )
}

export function CartIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2.5 3.5H5.5L7.6 14.2C7.8 15.2 8.7 16 9.8 16H17.9C18.9 16 19.8 15.3 20.1 14.3L21.5 7.5H6.4" />
    </svg>
  )
}
