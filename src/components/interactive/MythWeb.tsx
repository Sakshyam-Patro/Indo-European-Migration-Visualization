import { useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mythConnections, mythCategories, type MythConnection } from '../../data/myths'
import { brand, surface, vizPalette, withAlpha } from '../../theme'
import useReducedMotion from '../../hooks/useReducedMotion'
import VizHeading from '../ui/VizHeading'

type Category = MythConnection['category']

/**
 * Category accents are pinned to fixed slots of the shared categorical palette.
 * `mythCategories` still supplies the labels; only the hexes are overridden, so
 * the same hue never means something different in a neighbouring visualisation.
 */
const CATEGORY_COLORS: Record<Category, string> = {
  deity: vizPalette[0],
  motif: vizPalette[1],
  ritual: vizPalette[2],
  cosmology: vizPalette[4],
}

const CATEGORY_ORDER: readonly Category[] = ['deity', 'motif', 'ritual', 'cosmology']

/** Label + accent for a category, resolved in one place. */
function categoryTheme(category: Category) {
  return { label: mythCategories[category].label, color: CATEGORY_COLORS[category] }
}

interface CategoryPillProps {
  label: string
  color: string
  /** The unselected filter state: neutral border, muted text. */
  muted?: boolean
  style?: CSSProperties
}

/**
 * The one pill used for category filters, card badges and the detail-panel
 * badge, so all three stay identical in size and weight.
 */
function CategoryPill({ label, color, muted = false, style }: CategoryPillProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: 26,
        padding: '0.25rem 0.8rem',
        borderRadius: 999,
        fontFamily: 'var(--font-body)',
        fontSize: '0.7rem',
        lineHeight: 1.2,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        border: `1px solid ${muted ? withAlpha(brand.textOnDark, 0.14) : withAlpha(color, 0.45)}`,
        background: muted ? withAlpha(brand.textOnDark, 0.05) : withAlpha(color, 0.14),
        color: muted ? 'var(--text-on-dark-muted)' : color,
        transition: 'background 0.2s, border-color 0.2s, color 0.2s',
        ...style,
      }}
    >
      {label}
    </span>
  )
}

const filterButtonStyle: CSSProperties = {
  padding: 0,
  border: 'none',
  background: 'none',
  borderRadius: 999,
  cursor: 'pointer',
  display: 'inline-flex',
}

export default function MythWeb() {
  const [selectedMyth, setSelectedMyth] = useState<MythConnection | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const detailRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const idBase = useId()

  // Panel ids are scoped per myth. AnimatePresence defaults to mode="sync", so
  // switching cards keeps the outgoing panel mounted while the next one enters;
  // a single shared id would be duplicated in the DOM for the whole cross-fade
  // and aria-controls would resolve to whichever copy came first.
  const panelIdFor = (mythId: string) => `${idBase}-panel-${mythId}`
  const headingIdFor = (mythId: string) => `${idBase}-heading-${mythId}`

  useEffect(() => {
    if (!selectedMyth) return
    const timer = window.setTimeout(() => {
      detailRef.current?.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'nearest',
      })
    }, 100)
    return () => window.clearTimeout(timer)
  }, [selectedMyth, reduced])

  const filtered =
    activeCategory === 'all'
      ? mythConnections
      : mythConnections.filter(m => m.category === activeCategory)

  const detail = selectedMyth ? categoryTheme(selectedMyth.category) : null

  return (
    <div style={{ width: '100%' }}>
      <VizHeading title="Compare Myths Across Traditions">
        Each card below is one deity, story or rite that recurs across Indo-European cultures.
        Filter the set by theme, then open a card to read the traditions side by side — the same
        figure as Vedic, Greek, Roman, Norse or Baltic sources actually record it.
      </VizHeading>

      <div
        role="group"
        aria-label="Filter myths by theme"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2rem',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          aria-pressed={activeCategory === 'all'}
          style={filterButtonStyle}
        >
          <CategoryPill
            label="All themes"
            color={brand.ochreLight}
            muted={activeCategory !== 'all'}
          />
        </button>
        {CATEGORY_ORDER.map(cat => {
          const { label, color } = categoryTheme(cat)
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(isActive ? 'all' : cat)}
              aria-pressed={isActive}
              style={filterButtonStyle}
            >
              <CategoryPill label={label} color={color} muted={!isActive} />
            </button>
          )
        })}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '0.75rem',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map(myth => {
            const { label, color } = categoryTheme(myth.category)
            const isSelected = selectedMyth?.id === myth.id
            // Applied to both hover and focus so the pointer and keyboard
            // affordances match.
            const raised = {
              backgroundColor: isSelected
                ? withAlpha(color, 0.16)
                : withAlpha(brand.bgElevated, 0.9),
              boxShadow: surface.cardShadow,
            }

            return (
              <motion.button
                key={myth.id}
                type="button"
                layout={!reduced}
                initial={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
                onClick={() => setSelectedMyth(isSelected ? null : myth)}
                // The card renders the myth's full description, which the
                // accessible-name calculation would otherwise concatenate into
                // a paragraph-long button name. Name it by theme + title; the
                // description is read in the panel this button opens.
                aria-label={`${label}: ${myth.name}`}
                aria-expanded={isSelected}
                aria-controls={isSelected ? panelIdFor(myth.id) : undefined}
                style={{
                  padding: '1.25rem',
                  backgroundColor: isSelected
                    ? withAlpha(color, 0.1)
                    : withAlpha(brand.bgElevated, 0.6),
                  border: isSelected
                    ? `1px solid ${withAlpha(color, 0.5)}`
                    : `1px solid ${withAlpha(brand.textOnDark, 0.06)}`,
                  borderRadius: 12,
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={raised}
                whileFocus={raised}
              >
                <CategoryPill label={label} color={color} style={{ alignSelf: 'flex-start' }} />

                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    color: isSelected ? color : 'var(--text-bright)',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    margin: 0,
                    transition: 'color 0.2s',
                  }}
                >
                  {myth.name}
                </h4>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: 'var(--text-on-dark-muted)',
                    lineHeight: 1.5,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {myth.description}
                </p>

                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: 'var(--text-on-dark-muted)',
                    marginTop: 'auto',
                    paddingTop: '0.4rem',
                    borderTop: `1px solid ${withAlpha(brand.textOnDark, 0.05)}`,
                  }}
                >
                  {myth.cultures.length} culture{myth.cultures.length !== 1 ? 's' : ''} compared
                </span>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedMyth && detail && (
          <motion.div
            ref={detailRef}
            key={selectedMyth.id}
            id={panelIdFor(selectedMyth.id)}
            role="region"
            aria-labelledby={headingIdFor(selectedMyth.id)}
            initial={{ opacity: 0, height: reduced ? 'auto' : 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: reduced ? 'auto' : 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                marginTop: '1.5rem',
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                background: withAlpha(brand.bgDeep, 0.7),
                borderRadius: 16,
                border: `1px solid ${withAlpha(detail.color, 0.3)}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <CategoryPill label={detail.label} color={detail.color} />
                  </div>
                  <h3
                    id={headingIdFor(selectedMyth.id)}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                      color: detail.color,
                      fontWeight: 500,
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {selectedMyth.name}
                  </h3>
                </div>
                <motion.button
                  type="button"
                  onClick={() => setSelectedMyth(null)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: 8,
                    backgroundColor: withAlpha(brand.textOnDark, 0.08),
                    border: `1px solid ${withAlpha(brand.textOnDark, 0.15)}`,
                    color: 'var(--text-on-dark-secondary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    flexShrink: 0,
                    minHeight: 36,
                  }}
                  whileHover={{ backgroundColor: withAlpha(brand.textOnDark, 0.16) }}
                  whileFocus={{ backgroundColor: withAlpha(brand.textOnDark, 0.16) }}
                >
                  Close
                </motion.button>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--text-on-dark-secondary)',
                  lineHeight: 1.7,
                  maxWidth: '75ch',
                  marginBottom: '1.75rem',
                }}
              >
                {selectedMyth.description}
              </p>

              <h4
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--text-on-dark-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: '1rem',
                }}
              >
                Across Cultures
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                  gap: '0.75rem',
                }}
              >
                {selectedMyth.cultures.map((c, i) => (
                  <motion.div
                    key={c.culture}
                    initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : i * 0.06 }}
                    style={{
                      padding: '1rem 1.25rem',
                      background: withAlpha(brand.bgDeep, 0.5),
                      borderRadius: 10,
                      border: `1px solid ${withAlpha(brand.textOnDark, 0.05)}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                        color: 'var(--text-on-dark-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        display: 'block',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {c.culture}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.15rem',
                        color: detail.color,
                        display: 'block',
                        marginBottom: '0.6rem',
                        lineHeight: 1.3,
                      }}
                    >
                      {c.deity}
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        color: 'var(--text-on-dark-secondary)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {c.details}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
