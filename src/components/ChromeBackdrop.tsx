/**
 * Fixed full-page liquid-chrome ambient layer.
 * Pure CSS: silvery metallic washes drift slowly behind all content.
 * `prefers-reduced-motion` freezes the drift; the static wash always remains.
 */
export default function ChromeBackdrop() {
  return (
    <div aria-hidden="true" className="chrome">
      <div className="chrome-wash" />
      <div className="chrome-blob chrome-blob-a" />
      <div className="chrome-blob chrome-blob-b" />
      <div className="chrome-blob chrome-blob-c" />
      <div className="chrome-sheen" />
    </div>
  )
}
