export default function ImageZoom({ children, className = '' }) {
  return (
    <div className={`image-zoom ${className}`}>
      <div className="image-zoom__ambient">
        <div className="image-zoom__hover">{children}</div>
      </div>
    </div>
  )
}
