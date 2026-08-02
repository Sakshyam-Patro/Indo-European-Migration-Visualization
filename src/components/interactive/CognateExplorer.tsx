import { memo, useCallback, useId, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cognates, type CognateEntry } from '../../data/cognates'
import PIEForm from '../ui/PIEForm'
import VizHeading from '../ui/VizHeading'
import useReducedMotion from '../../hooks/useReducedMotion'
import { vizPalette, withAlpha, brand } from '../../theme'

const LANGUAGES = [
  'English', 'Latin', 'Greek', 'Sanskrit',
  'Russian', 'Irish', 'Persian', 'Lithuanian',
]

/** Stable language → categorical colour, assigned by index into the shared palette. */
const LANG_COLORS: Record<string, string> = Object.fromEntries(
  LANGUAGES.map((lang, index) => [lang, vizPalette[index % vizPalette.length]] as const),
)

/** One definition of the row layout, shared by the header, the rows and the column overlay. */
const GRID_COLUMNS = `130px repeat(${LANGUAGES.length}, minmax(0, 1fr))`

/** Below this width the grid stops shrinking and the wrapper scrolls sideways instead. */
const GRID_MIN_WIDTH = 740

/** Glyph standing in for a language that never inherited the root. */
const NO_COGNATE_MARK = '–'

const GENERIC_REASON = 'No cognate attested in this language'

/**
 * `src/data/cognates.ts` marks a missing form with a placeholder whose first
 * character is "(" — e.g. "(no cognate; Slavic lost this root)". Real forms
 * never open with "(", though they may carry a trailing script or gloss
 * parenthetical. This is the single test for "no cognate here"; every caller
 * in this file goes through it rather than re-deriving the rule.
 */
function isPlaceholder(form: string | undefined): boolean {
  return !form || form.trimStart().startsWith('(')
}

/** The citable word on its own, with any trailing script/gloss parenthetical dropped. */
function shortForm(form: string): string {
  if (!form) return NO_COGNATE_MARK
  const match = form.match(/^([^(]+?)(?:\s*\(|$)/)
  return match ? match[1].trim() : form
}

/**
 * Renders a placeholder as prose: strips the wrapping parentheses and
 * capitalises the first letter, so "(no cognate; uses tėvas)" reads as
 * "No cognate; uses tėvas".
 */
function placeholderReason(form: string | undefined): string {
  if (!form) return GENERIC_REASON
  const wrapped = form.trim().match(/^\((.*)\)$/)
  const inner = (wrapped ? wrapped[1] : form).trim()
  if (!inner) return GENERIC_REASON
  return inner.charAt(0).toUpperCase() + inner.slice(1)
}

/** Lowercases and drops combining diacritics, so "pater" matches "patḗr". */
function fold(value: string): string {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

/**
 * Pre-folded search text per entry. The data is a static import, so this is
 * built once at module load rather than on every keystroke. Placeholders are
 * excluded — otherwise every query containing "cognate" would match all rows.
 */
const SEARCH_INDEX: { entry: CognateEntry; haystack: string }[] = cognates.map(entry => {
  const attested = LANGUAGES
    .map(lang => entry.forms[lang])
    .filter(form => !isPlaceholder(form))
  return {
    entry,
    haystack: fold([entry.pieRoot, entry.meaning, ...attested].join(' ')),
  }
})

const rowGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: GRID_COLUMNS,
  gap: 2,
}

const meaningCellStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.6rem 0.5rem',
  fontSize: '0.85rem',
  fontFamily: 'var(--font-body)',
  fontWeight: 500,
  textAlign: 'left',
  background: 'none',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  transition: 'color 0.2s',
}

const formCellStyle: CSSProperties = {
  padding: '0.6rem 0.4rem',
  textAlign: 'center',
  fontFamily: 'var(--font-display)',
  fontSize: '0.9rem',
  transition: 'color 0.2s',
}

const missingCellStyle: CSSProperties = {
  padding: '0.6rem 0.4rem',
  minHeight: 32,
  fontFamily: 'var(--font-display)',
  fontSize: '0.85rem',
  color: 'var(--text-on-dark-muted)',
  background: 'none',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
}

const noteStyle: CSSProperties = {
  padding: '0.5rem 0.75rem 0.65rem',
  fontFamily: 'var(--font-body)',
  fontSize: '0.8rem',
  lineHeight: 1.5,
  color: 'var(--text-on-dark-secondary)',
  borderTop: `1px solid ${withAlpha(brand.bronze, 0.25)}`,
}

const headerLabelStyle: CSSProperties = {
  padding: '0.6rem 0.5rem',
  fontSize: '0.75rem',
  color: 'var(--text-on-dark-muted)',
  fontFamily: 'var(--font-body)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}

interface CognateRowProps {
  entry: CognateEntry
  isSelected: boolean
  /** Panel the meaning button expands, for `aria-controls`. */
  detailPanelId: string
  onToggle: (entry: CognateEntry) => void
}

/**
 * One cognate set. Memoised, and it keeps its own hover/disclosure state, so
 * highlighting a column or opening a note re-renders a single row instead of
 * all seventy-odd.
 */
const CognateRow = memo(function CognateRow({
  entry,
  isSelected,
  detailPanelId,
  onToggle,
}: CognateRowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [previewLang, setPreviewLang] = useState<string | null>(null)
  const [pinnedLang, setPinnedLang] = useState<string | null>(null)
  const noteId = useId()

  /**
   * Hover and focus *preview* a note; clicking *pins* it. The two must stay
   * separate: a tap fires mouseenter/focus and then click on the same element,
   * so a single toggle would open the note and instantly close it again —
   * leaving touch users with no way to read it at all. Preview wins over pin
   * so that pointing at a second dash still responds while one is pinned.
   */
  const openLang = previewLang ?? pinnedLang
  const clearPreview = (lang: string) =>
    setPreviewLang(current => (current === lang ? null : current))

  const background = isSelected
    ? withAlpha(brand.teal, isHovered ? 0.18 : 0.12)
    : withAlpha(brand.bgElevated, isHovered ? 0.9 : 0.6)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        zIndex: 1,
        borderRadius: 6,
        background,
        border: `1px solid ${isSelected ? withAlpha(brand.teal, 0.35) : 'transparent'}`,
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      <div style={rowGridStyle}>
        <button
          type="button"
          onClick={() => onToggle(entry)}
          aria-expanded={isSelected}
          aria-controls={isSelected ? detailPanelId : undefined}
          style={{
            ...meaningCellStyle,
            color: isSelected ? 'var(--teal-light)' : 'var(--text-on-dark-secondary)',
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '0.7rem', opacity: 0.8 }}>
            {isSelected ? '▾' : '▸'}
          </span>
          {entry.meaning}
        </button>

        {LANGUAGES.map(lang => {
          const form = entry.forms[lang]

          if (isPlaceholder(form)) {
            const isOpen = openLang === lang
            return (
              <button
                key={lang}
                type="button"
                aria-expanded={isOpen}
                aria-controls={isOpen ? noteId : undefined}
                aria-label={`No ${lang} cognate for "${entry.meaning}" — show why`}
                onClick={() => setPinnedLang(current => (current === lang ? null : lang))}
                onMouseEnter={() => setPreviewLang(lang)}
                onMouseLeave={() => clearPreview(lang)}
                onFocus={() => setPreviewLang(lang)}
                onBlur={() => clearPreview(lang)}
                style={{
                  ...missingCellStyle,
                  background: isOpen ? withAlpha(brand.bronze, 0.2) : 'none',
                  textDecoration: 'underline dotted',
                  textUnderlineOffset: 4,
                }}
              >
                {NO_COGNATE_MARK}
              </button>
            )
          }

          return (
            <div
              key={lang}
              style={{
                ...formCellStyle,
                color: isSelected ? LANG_COLORS[lang] : 'var(--text-on-dark)',
              }}
            >
              {shortForm(form)}
            </div>
          )
        })}
      </div>

      {openLang && (
        <div id={noteId} style={noteStyle}>
          <span style={{ color: LANG_COLORS[openLang], fontWeight: 600 }}>{openLang}</span>
          {' — '}
          {placeholderReason(entry.forms[openLang])}
        </div>
      )}
    </div>
  )
})

export default function CognateExplorer() {
  const [selectedCognate, setSelectedCognate] = useState<CognateEntry | null>(null)
  const [hoveredLang, setHoveredLang] = useState<string | null>(null)
  const [pinnedLang, setPinnedLang] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const reducedMotion = useReducedMotion()
  const searchId = useId()
  const detailPanelId = useId()

  const results = useMemo(() => {
    const needle = fold(query.trim())
    if (!needle) return cognates
    return SEARCH_INDEX.filter(item => item.haystack.includes(needle)).map(item => item.entry)
  }, [query])

  const handleToggle = useCallback((entry: CognateEntry) => {
    setSelectedCognate(current => (current?.pieRoot === entry.pieRoot ? null : entry))
  }, [])

  // Hover/focus wins over the pin, so pointing at another column still
  // responds while one is pinned; the pin comes back when the pointer leaves.
  const highlightedLang = hoveredLang ?? pinnedLang
  const highlightIndex = highlightedLang ? LANGUAGES.indexOf(highlightedLang) : -1

  const attestedLangs = selectedCognate
    ? LANGUAGES.filter(lang => !isPlaceholder(selectedCognate.forms[lang]))
    : []
  const missingLangs = selectedCognate
    ? LANGUAGES
      .filter(lang => isPlaceholder(selectedCognate.forms[lang]))
      .map(lang => ({ lang, reason: placeholderReason(selectedCognate.forms[lang]) }))
    : []

  return (
    <div style={{ width: '100%' }}>
      <VizHeading title="The Cognate Explorer">
        Search or scroll the table, then select any meaning to see the ancient root its words
        descend from. A dash marks a language that never inherited the root — select it to read
        what happened instead.
      </VizHeading>

      <div style={{ marginBottom: '1rem', maxWidth: 460 }}>
        <label
          htmlFor={searchId}
          style={{
            display: 'block',
            marginBottom: '0.35rem',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-body)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-on-dark-muted)',
          }}
        >
          Search roots, meanings and word forms
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Escape') setQuery('')
            }}
            placeholder="e.g. father, pater, *dyew, night"
            style={{
              flex: 1,
              minWidth: 0,
              padding: '0.55rem 0.75rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-on-dark)',
              background: withAlpha(brand.bgDeep, 0.6),
              border: `1px solid ${withAlpha(brand.bronze, 0.35)}`,
              borderRadius: 8,
            }}
          />
          <button
            type="button"
            onClick={() => setQuery('')}
            disabled={query === ''}
            style={{
              padding: '0.55rem 0.9rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: query ? 'var(--text-on-dark-secondary)' : 'var(--text-on-dark-muted)',
              background: 'none',
              border: `1px solid ${withAlpha(brand.bronze, query ? 0.35 : 0.15)}`,
              borderRadius: 8,
              cursor: query ? 'pointer' : 'default',
              opacity: query ? 1 : 0.5,
            }}
          >
            Clear
          </button>
        </div>
        <p
          role="status"
          aria-live="polite"
          style={{
            marginTop: '0.4rem',
            marginBottom: 0,
            fontSize: '0.75rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-on-dark-muted)',
          }}
        >
          {query.trim()
            ? `${results.length} of ${cognates.length} roots match "${query.trim()}"`
            : `Showing all ${cognates.length} roots`}
        </p>
      </div>

      <p
        style={{
          marginBottom: '0.75rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-on-dark-muted)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)' }}>{NO_COGNATE_MARK}</span>
        {' = no cognate in that language. Select a dash, or a column heading, for details.'}
      </p>

      <div
        role="region"
        aria-label="Cognate comparison table — scrollable"
        tabIndex={0}
        style={{
          maxHeight: 'min(70vh, 640px)',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div style={{ minWidth: GRID_MIN_WIDTH }}>
          <div
            style={{
              ...rowGridStyle,
              gap: 0,
              marginBottom: 2,
              position: 'sticky',
              top: 0,
              zIndex: 10,
              background: 'var(--bg-surface)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div style={headerLabelStyle}>Meaning</div>
            {LANGUAGES.map(lang => {
              const isActive = highlightedLang === lang
              const isPinned = pinnedLang === lang
              return (
                <button
                  key={lang}
                  type="button"
                  aria-pressed={isPinned}
                  aria-label={`${lang} — keep this column highlighted`}
                  onClick={() => setPinnedLang(current => (current === lang ? null : lang))}
                  onMouseEnter={() => setHoveredLang(lang)}
                  onMouseLeave={() => setHoveredLang(null)}
                  onFocus={() => setHoveredLang(lang)}
                  onBlur={() => setHoveredLang(null)}
                  style={{
                    padding: '0.6rem 0.4rem',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-body)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    textAlign: 'center',
                    color: isActive ? LANG_COLORS[lang] : 'var(--text-on-dark-muted)',
                    background: 'none',
                    border: 'none',
                    borderBottom: `2px solid ${isActive ? LANG_COLORS[lang] : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  {lang}
                  {isPinned && <span aria-hidden="true"> ●</span>}
                </button>
              )
            })}
          </div>

          {results.length === 0 ? (
            <div
              style={{
                padding: '2.5rem 1rem',
                textAlign: 'center',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-on-dark-secondary)',
              }}
            >
              <p style={{ marginBottom: '0.75rem' }}>
                No root, meaning or word form matches "{query.trim()}".
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                style={{
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--teal-light)',
                  background: withAlpha(brand.teal, 0.15),
                  border: `1px solid ${withAlpha(brand.teal, 0.35)}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                Clear the search
              </button>
            </div>
          ) : (
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {results.map(entry => (
                <CognateRow
                  key={entry.pieRoot}
                  entry={entry}
                  isSelected={selectedCognate?.pieRoot === entry.pieRoot}
                  detailPanelId={detailPanelId}
                  onToggle={handleToggle}
                />
              ))}

              {highlightIndex >= 0 && highlightedLang && (
                <div
                  aria-hidden="true"
                  style={{
                    ...rowGridStyle,
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      gridColumn: highlightIndex + 2,
                      boxSizing: 'border-box',
                      borderRadius: 6,
                      background: withAlpha(LANG_COLORS[highlightedLang], 0.08),
                      border: `1px solid ${withAlpha(LANG_COLORS[highlightedLang], 0.35)}`,
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedCognate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              id={detailPanelId}
              role="region"
              aria-label={`Details for ${selectedCognate.pieRoot}, "${selectedCognate.meaning}"`}
              style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                background: withAlpha(brand.bgDeep, 0.6),
                borderRadius: 12,
                border: `1px solid ${withAlpha(brand.ochreLight, 0.12)}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <PIEForm root={selectedCognate.pieRoot} style={{ fontSize: '1.8rem' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--text-on-dark-muted)',
                  }}
                >
                  Proto-Indo-European &middot; "{selectedCognate.meaning}"
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCognate(null)}
                  style={{
                    marginLeft: 'auto',
                    padding: '0.35rem 0.75rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: 'var(--text-on-dark-secondary)',
                    background: 'none',
                    border: `1px solid ${withAlpha(brand.bronze, 0.35)}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>

              {selectedCognate.soundNotes && (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--text-on-dark-secondary)',
                    lineHeight: 1.6,
                    maxWidth: '65ch',
                    marginBottom: 0,
                  }}
                >
                  {selectedCognate.soundNotes}
                </p>
              )}

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginTop: '1rem',
                }}
              >
                {attestedLangs.map(lang => (
                  <span
                    key={lang}
                    style={{
                      padding: '0.35rem 0.75rem',
                      background: withAlpha(brand.bgDeep, 0.5),
                      borderRadius: 20,
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.95rem',
                      color: LANG_COLORS[lang],
                      border: `1px solid ${withAlpha(LANG_COLORS[lang], 0.2)}`,
                    }}
                  >
                    {shortForm(selectedCognate.forms[lang])}
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-on-dark-muted)',
                        marginLeft: '0.4rem',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {lang}
                    </span>
                  </span>
                ))}
              </div>

              {missingLangs.length > 0 && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    background: withAlpha(brand.bgDeep, 0.4),
                    borderRadius: 8,
                    border: `1px solid ${withAlpha(brand.bronze, 0.2)}`,
                  }}
                >
                  <h4
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-on-dark-muted)',
                      fontFamily: 'var(--font-body)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.4rem',
                      fontWeight: 600,
                    }}
                  >
                    Not attested
                  </h4>
                  {missingLangs.map(({ lang, reason }) => (
                    <div
                      key={lang}
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-on-dark-muted)',
                        fontFamily: 'var(--font-body)',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: LANG_COLORS[lang], opacity: 0.75 }}>{lang}</span>
                      {' — '}
                      {reason}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
