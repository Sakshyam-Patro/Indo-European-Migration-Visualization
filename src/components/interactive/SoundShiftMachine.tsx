import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { grimmsLaw, type SoundShift } from '../../data/soundChanges'
import VizHeading from '../ui/VizHeading'
import PIEForm from '../ui/PIEForm'
import useReducedMotion from '../../hooks/useReducedMotion'
import { brand, surface, vizPalette, withAlpha } from '../../theme'

/** The articulatory classes named in the group labels and the glossary. */
type PhoneticTerm = 'Voiceless stops' | 'Fricatives' | 'Voiced stops' | 'Voiced aspirates'

const PHONETIC_GLOSSARY: Record<PhoneticTerm, string> = {
  'Voiceless stops':
    'Consonants made by fully blocking airflow with no vocal cord vibration, such as p, t and k.',
  Fricatives:
    'Consonants made by forcing air through a narrow gap so it hisses, such as f, th and h.',
  'Voiced stops':
    'Consonants made by fully blocking airflow while the vocal cords vibrate, such as b, d and g.',
  'Voiced aspirates':
    'Consonants with vocal cord vibration plus an audible puff of breath, such as Sanskrit bh, dh and gh.',
}

type ShiftGroupId = 'voiceless-to-fricatives' | 'voiced-to-voiceless' | 'aspirates-to-voiced'

interface ShiftGroup {
  id: ShiftGroupId
  /** Class the PIE sounds belonged to. Stored as a field, never parsed back out of a label. */
  from: PhoneticTerm
  /** Class their Germanic reflexes belong to. */
  to: PhoneticTerm
  description: string
  /**
   * `pieLetter` values from `grimmsLaw`. These are stable identifiers, so
   * reordering or inserting rows in the data file cannot reshuffle the groups.
   */
  pieLetters: string[]
}

const SHIFT_GROUPS: ShiftGroup[] = [
  {
    id: 'voiceless-to-fricatives',
    from: 'Voiceless stops',
    to: 'Fricatives',
    description: 'PIE voiceless stops became fricatives in Germanic.',
    pieLetters: ['*p', '*t', '*k / *ḱ'],
  },
  {
    id: 'voiced-to-voiceless',
    from: 'Voiced stops',
    to: 'Voiceless stops',
    description: 'PIE voiced stops lost their voicing in Germanic.',
    pieLetters: ['*d', '*b', '*g / *ǵ'],
  },
  {
    id: 'aspirates-to-voiced',
    from: 'Voiced aspirates',
    to: 'Voiced stops',
    description: 'PIE breathy voiced stops lost their aspiration in Germanic.',
    pieLetters: ['*bʰ', '*dʰ', '*gʰ / *ǵʰ'],
  },
]

/**
 * Keyed by group id rather than by position, so adding or reordering a group
 * cannot silently hand it another group's hue. A missing key is a build error.
 */
const GROUP_COLORS: Record<ShiftGroupId, string> = {
  'voiceless-to-fricatives': vizPalette[0],
  'voiced-to-voiceless': vizPalette[1],
  'aspirates-to-voiced': vizPalette[2],
}

/** How long the machine ignores further clicks while the example animates in. */
const ANIMATION_LOCK_MS = 800

/** Accessible name for a group — the arrow glyph does not read aloud usefully. */
function groupLabel(group: ShiftGroup): string {
  return `${group.from} become ${group.to}`
}

/**
 * Resolves a group's rows by `pieLetter`. A letter that no longer exists in
 * `soundChanges.ts` is dropped rather than rendered as a blank card.
 */
function shiftsForGroup(group: ShiftGroup): SoundShift[] {
  return group.pieLetters
    .map(letter => grimmsLaw.find(entry => entry.pieLetter === letter))
    .filter((entry): entry is SoundShift => entry !== undefined)
}

/**
 * The Germanic reflex is the one Grimm's Law actually produced. Selected by
 * `changeType`, not by array position — the other branches in a row are
 * retentions, centum mergers or satem palatalisations.
 */
function germanicReflex(shift: SoundShift) {
  return shift.shifts.find(entry => entry.changeType === "Grimm's Law")
}

export default function SoundShiftMachine() {
  const reduced = useReducedMotion()
  const [activeGroup, setActiveGroup] = useState(0)
  const [selectedShift, setSelectedShift] = useState<SoundShift | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const lockTimer = useRef<number | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(
    () => () => {
      if (lockTimer.current !== null) window.clearTimeout(lockTimer.current)
    },
    [],
  )

  const group = SHIFT_GROUPS[activeGroup]
  const color = GROUP_COLORS[group.id]
  const rows = shiftsForGroup(group)
  const selectedReflex = selectedShift ? germanicReflex(selectedShift) : undefined
  const otherBranches = selectedShift
    ? selectedShift.shifts.filter(entry => entry.changeType !== "Grimm's Law" && entry.example)
    : []

  const selectGroup = (index: number) => {
    setActiveGroup(index)
    setSelectedShift(null)
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = SHIFT_GROUPS.length - 1
    let next: number | null = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = activeGroup === last ? 0 : activeGroup + 1
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = activeGroup === 0 ? last : activeGroup - 1
    } else if (event.key === 'Home') {
      next = 0
    } else if (event.key === 'End') {
      next = last
    }
    if (next === null) return
    event.preventDefault()
    selectGroup(next)
    tabRefs.current[next]?.focus()
  }

  const handleShiftClick = (shift: SoundShift) => {
    if (reduced) {
      setSelectedShift(shift)
      return
    }
    if (isAnimating) return
    setIsAnimating(true)
    setSelectedShift(shift)
    if (lockTimer.current !== null) window.clearTimeout(lockTimer.current)
    lockTimer.current = window.setTimeout(() => {
      lockTimer.current = null
      setIsAnimating(false)
    }, ANIMATION_LOCK_MS)
  }

  return (
    <div style={{ width: '100%' }}>
      <VizHeading title="Grimm's Law Machine">
        Grimm's Law is a chain of three linked consonant shifts that separated Germanic from every
        other Indo-European branch. Choose a group of sounds, then pick a shift to see a worked
        example alongside the same root in branches that did not undergo it.
      </VizHeading>

      <div
        role="tablist"
        aria-label="Grimm's Law consonant groups"
        style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}
      >
        {SHIFT_GROUPS.map((item, i) => {
          const isActive = activeGroup === i
          const tabColor = GROUP_COLORS[item.id]
          return (
            <button
              key={item.id}
              ref={el => {
                tabRefs.current[i] = el
              }}
              id={`shift-tab-${item.id}`}
              role="tab"
              type="button"
              aria-label={groupLabel(item)}
              aria-selected={isActive}
              // Only one panel is in the DOM at a time, so an inactive tab must
              // not point aria-controls at an id that does not exist.
              aria-controls={isActive ? `shift-panel-${item.id}` : undefined}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectGroup(i)}
              onKeyDown={handleTabKeyDown}
              style={{
                padding: '0.6rem 1rem',
                minHeight: 36,
                borderRadius: 8,
                border: `1px solid ${isActive ? withAlpha(tabColor, 0.4) : withAlpha(brand.bronze, 0.25)}`,
                background: isActive ? withAlpha(tabColor, 0.1) : 'transparent',
                color: isActive ? tabColor : 'var(--text-on-dark-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'color 0.2s, background 0.2s, border-color 0.2s',
              }}
            >
              {item.from} <span aria-hidden="true">→</span> {item.to}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`shift-panel-${group.id}`}
        aria-labelledby={`shift-tab-${group.id}`}
        tabIndex={-1}
      >
        <p
          style={{
            color: 'var(--text-on-dark-secondary)',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-body)',
            marginBottom: '1rem',
          }}
        >
          {group.description}
        </p>

        <dl
          style={{
            display: 'flex',
            gap: '1rem',
            margin: '0 0 1.5rem',
            flexWrap: 'wrap',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            lineHeight: 1.5,
          }}
        >
          {[group.from, group.to].map(term => (
            <div key={term} style={{ flex: '1 1 220px' }}>
              <dt style={{ fontWeight: 600, color, display: 'inline' }}>{term}: </dt>
              <dd style={{ display: 'inline', margin: 0, color: 'var(--text-on-dark-muted)' }}>
                {PHONETIC_GLOSSARY[term]}
              </dd>
            </div>
          ))}
        </dl>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem',
            marginBottom: '2rem',
          }}
        >
          {rows.map(shift => {
            const reflex = germanicReflex(shift)
            const isActive = selectedShift?.pieLetter === shift.pieLetter
            return (
              <motion.button
                key={shift.pieLetter}
                type="button"
                onClick={() => handleShiftClick(shift)}
                aria-pressed={isActive}
                aria-label={`${shift.pieLetter} becomes ${reflex?.result ?? 'its Germanic reflex'} in Germanic. ${shift.description}.`}
                whileHover={reduced ? undefined : { scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                style={{
                  padding: '1.25rem',
                  borderRadius: 12,
                  border: `1px solid ${isActive ? withAlpha(color, 0.55) : withAlpha(brand.bronze, 0.2)}`,
                  background: isActive ? withAlpha(color, 0.1) : withAlpha(brand.bgDeep, 0.5),
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <PIEForm root={shift.pieLetter} style={{ fontSize: '1.8rem' }} />
                  <span style={{ color, fontSize: '1.2rem' }}>→</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      color,
                      fontWeight: 500,
                    }}
                  >
                    {reflex?.result}
                  </span>
                </div>
                <div
                  aria-hidden="true"
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-on-dark-muted)',
                    fontFamily: 'var(--font-body)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {shift.description}
                </div>
                {isActive && (
                  <div
                    aria-hidden="true"
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text-on-dark-secondary)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Example shown below ▾
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {selectedShift && selectedReflex?.example && (
            <motion.div
              key={selectedShift.pieLetter}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
              style={{
                padding: '2rem',
                background: withAlpha(brand.bgDeep, 0.6),
                borderRadius: 16,
                border: `1px solid ${surface.cardBorderSubtle}`,
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-on-dark-muted)',
                  fontFamily: 'var(--font-body)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1.5rem',
                }}
              >
                Example: “{selectedReflex.example.meaning}”
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                }}
              >
                <motion.div
                  initial={reduced ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduced ? 0 : 0.1 }}
                  style={{ textAlign: 'center' }}
                >
                  <PIEForm
                    root={selectedReflex.example.pie}
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                  />
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-on-dark-muted)',
                      marginTop: '0.3rem',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Proto-Indo-European
                  </div>
                </motion.div>

                <motion.div
                  initial={reduced ? false : { opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: reduced ? 0 : 0.3 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <motion.div
                    animate={reduced ? undefined : { rotate: 360 }}
                    transition={reduced ? undefined : { duration: 2, repeat: Infinity, ease: 'linear' }}
                    aria-hidden="true"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      border: `2px solid ${brand.bronze}`,
                      borderTopColor: brand.ochreLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: brand.ochreLight,
                      }}
                    />
                  </motion.div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: brand.ochreLight,
                      fontFamily: 'var(--font-body)',
                      letterSpacing: '0.05em',
                      textAlign: 'center',
                    }}
                  >
                    Grimm's Law: {selectedShift.pieLetter} → {selectedReflex.result}
                  </span>
                </motion.div>

                <motion.div
                  initial={reduced ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduced ? 0 : 0.5 }}
                  style={{ textAlign: 'center' }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      fontWeight: 500,
                      color,
                    }}
                  >
                    {selectedReflex.example.daughter}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-on-dark-muted)',
                      marginTop: '0.3rem',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    English (Germanic)
                  </div>
                </motion.div>
              </div>

              {selectedShift.note && (
                <p
                  style={{
                    marginTop: '1.5rem',
                    marginBottom: 0,
                    fontSize: '0.82rem',
                    lineHeight: 1.6,
                    color: 'var(--text-on-dark-secondary)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {selectedShift.note}
                </p>
              )}

              {otherBranches.length > 0 && (
                <div
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: `1px solid ${withAlpha(brand.bronze, 0.2)}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-on-dark-muted)',
                      marginBottom: '0.75rem',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    The same root in branches Grimm's Law never touched — each label names the change
                    that produced that form instead:
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {otherBranches.map(entry => (
                      <span
                        key={entry.branch}
                        style={{
                          padding: '0.35rem 0.7rem',
                          background: withAlpha(brand.bgDeep, 0.55),
                          borderRadius: 16,
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.9rem',
                          color: 'var(--text-on-dark)',
                        }}
                      >
                        {entry.example?.daughter}
                        <span
                          style={{
                            fontSize: '0.7rem',
                            color: 'var(--text-on-dark-muted)',
                            marginLeft: '0.4rem',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {entry.branch}
                          {entry.changeType ? ` · ${entry.changeType}` : ''}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
