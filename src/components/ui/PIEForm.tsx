import type { CSSProperties } from 'react'

interface PIEFormProps {
  /** The reconstructed root. A leading asterisk is optional and de-duplicated. */
  root: string
  className?: string
  style?: CSSProperties
}

/**
 * Renders a reconstructed Proto-Indo-European form with its asterisk.
 *
 * Colours come from `.pie-form` / `.pie-asterisk` in `index.css`, which adapt
 * to the surrounding light or dark section. Always use this rather than
 * hand-rolling the asterisk markup, so the notation stays consistent.
 */
export function PIEForm({ root, className, style }: PIEFormProps) {
  const bare = root.replace(/^\*/, '')
  return (
    <span
      className={className ? `pie-form ${className}` : 'pie-form'}
      style={{ whiteSpace: 'nowrap', ...style }}
    >
      <span className="pie-asterisk">*</span>
      {bare}
    </span>
  )
}

export default PIEForm
