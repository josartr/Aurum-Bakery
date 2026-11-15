import { useState } from 'react'
import { BrandMark } from './BrandLogo'

export default function MediaImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed || !src) {
    return (
      <div className={`media-fallback ${className}`.trim()} role="img" aria-label={alt}>
        <BrandMark size={36} className="media-fallback-mark" />
        <span className="media-fallback-label">{alt}</span>
      </div>
    )
  }

  return (
    <span className={`media-frame ${className}`.trim()}>
      {!loaded && <span className="media-skeleton skeleton-block" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        className={`media-img ${loaded ? 'is-loaded' : ''}`.trim()}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </span>
  )
}
