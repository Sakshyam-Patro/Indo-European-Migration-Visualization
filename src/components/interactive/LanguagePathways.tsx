import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VizHeading from '../ui/VizHeading'
import Legend from '../ui/Legend'
import useReducedMotion from '../../hooks/useReducedMotion'
import { brand, vizPalette, withAlpha } from '../../theme'
import { pathways, MECHANISM_LABELS, type PathwayMechanism } from '../../data/pathways'

/**
 * Keyed by the mechanism union, so adding a mechanism to the data is a build
 * error here until it is given a colour and a marker.
 */
const MECHANISM_COLORS: Record<PathwayMechanism, string> = {
  mass_migration: vizPalette[6],
  elite_dominance: vizPalette[5],
  mixed: vizPalette[4],
}

/** Shape cue so the mechanism never rests on hue alone. */
const MECHANISM_MARKERS: Record<PathwayMechanism, string> = {
  mass_migration: '▲',
  elite_dominance: '■',
  mixed: '◆',
}

const MECHANISM_ORDER: PathwayMechanism[] = ['mass_migration', 'elite_dominance', 'mixed']

export default function LanguagePathways() {
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [focusedStep, setFocusedStep] = useState<number | null>(null)

  const pathway = pathways.find(p => p.language === selected)

  return (
    <div style={{ width: '100%' }}>
      <VizHeading title="How Did Your Language Get Here?">
        Pick a modern language to trace its journey from the Pontic-Caspian steppe to the present
        day. Each pathway is labelled with the mechanism that carried Indo-European speech into the
        region.
      </VizHeading>

      <div
        role="group"
        aria-label="Choose a language"
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}
      >
        {pathways.map(p => {
          const isActive = selected === p.language
          return (
            <button
              key={p.language}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                setSelected(isActive ? null : p.language)
                setActiveStep(0)
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.1rem',
                padding: '0.5rem 1.1rem',
                minHeight: 44,
                borderRadius: 10,
                border: `1px solid ${
                  isActive ? withAlpha(brand.ochreLight, 0.4) : withAlpha(brand.ochreLight, 0.15)
                }`,
                background: isActive
                  ? withAlpha(brand.ochreLight, 0.12)
                  : withAlpha(brand.bgDeep, 0.5),
                color: isActive ? brand.ochreLight : brand.textOnDarkSecondary,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: isActive ? 600 : 400,
                textAlign: 'left',
                transition: 'color 0.2s ease, background 0.2s ease, border-color 0.2s ease',
              }}
            >
              {p.language}
              <span style={{ fontSize: '0.7rem', color: brand.textOnDarkMuted, fontWeight: 400 }}>
                {p.region}
              </span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {pathway && (
          <motion.div
            key={pathway.language}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduced ? 0 : 0.35 }}
          >
            <div
              style={{
                padding: '1.25rem 1.5rem',
                background: withAlpha(brand.bgDeep, 0.6),
                borderRadius: 12,
                border: `1px solid ${withAlpha(brand.ochreLight, 0.1)}`,
                marginBottom: '1.5rem',
              }}
            >
              <p
                style={{
                  color: brand.textOnDark,
                  fontSize: '1rem',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.65,
                  marginBottom: '0.75rem',
                }}
              >
                {pathway.summary}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span
                  style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: 6,
                    background: withAlpha(MECHANISM_COLORS[pathway.mechanism], 0.12),
                    border: `1px solid ${withAlpha(MECHANISM_COLORS[pathway.mechanism], 0.35)}`,
                    color: MECHANISM_COLORS[pathway.mechanism],
                    fontWeight: 600,
                  }}
                >
                  <span aria-hidden="true">{MECHANISM_MARKERS[pathway.mechanism]} </span>
                  {pathway.mechanismLabel}
                </span>
                <span style={{ color: brand.textOnDarkMuted }}>
                  Steppe DNA:{' '}
                  <strong style={{ color: brand.textOnDark }}>{pathway.steppeAncestry}</strong>
                </span>
                <span style={{ color: brand.textOnDarkMuted }}>
                  Speakers:{' '}
                  <strong style={{ color: brand.textOnDark }}>{pathway.modernSpeakers}</strong>
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: '0.8rem',
                color: brand.textOnDarkMuted,
                fontFamily: 'var(--font-body)',
                marginBottom: '0.75rem',
                fontStyle: 'italic',
              }}
            >
              Select any step to expand it, or walk through them with the buttons below.
            </p>

            <div style={{ position: 'relative', paddingLeft: 32 }}>
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: 11,
                  top: 8,
                  bottom: 8,
                  width: 2,
                  background: withAlpha(brand.ochreLight, 0.15),
                }}
              />

              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {pathway.steps.map((step, i) => {
                  const isStepActive = activeStep === i
                  const isHighlighted = hoveredStep === i || focusedStep === i
                  const mechColor = MECHANISM_COLORS[pathway.mechanism]
                  const buttonId = `pathway-step-${i}`
                  const detailId = `pathway-step-detail-${i}`
                  const background = isStepActive
                    ? withAlpha(brand.ochreLight, 0.09)
                    : isHighlighted
                      ? withAlpha(brand.ochreLight, 0.05)
                      : 'transparent'

                  return (
                    <li
                      key={step.label}
                      style={{ marginBottom: i < pathway.steps.length - 1 ? '0.5rem' : 0 }}
                    >
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isStepActive}
                        // The detail panel is unmounted while collapsed, so the
                        // reference is only valid on the expanded step.
                        aria-controls={isStepActive ? detailId : undefined}
                        onClick={() => setActiveStep(i)}
                        onMouseEnter={() => setHoveredStep(i)}
                        onMouseLeave={() => setHoveredStep(null)}
                        onFocus={() => setFocusedStep(i)}
                        onBlur={() => setFocusedStep(null)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          flexWrap: 'wrap',
                          width: '100%',
                          minHeight: 32,
                          textAlign: 'left',
                          background,
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.6rem 0.6rem 0.6rem 0',
                          borderRadius: 8,
                          position: 'relative',
                          transition: 'background 0.15s ease',
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            position: 'absolute',
                            left: -26,
                            top: 15,
                            width: isStepActive ? 14 : 10,
                            height: isStepActive ? 14 : 10,
                            borderRadius: '50%',
                            background: isStepActive ? mechColor : withAlpha(brand.ochreLight, 0.3),
                            border: isStepActive ? `2px solid ${withAlpha(mechColor, 0.3)}` : 'none',
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.8rem',
                            color: isStepActive ? mechColor : brand.textOnDarkMuted,
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            flexShrink: 0,
                          }}
                        >
                          {step.date}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: isStepActive ? '1.1rem' : '1rem',
                            color: isStepActive ? 'var(--text-bright)' : brand.textOnDarkSecondary,
                            fontWeight: isStepActive ? 600 : 400,
                          }}
                        >
                          {step.label}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isStepActive && (
                          <motion.div
                            id={detailId}
                            role="region"
                            aria-labelledby={buttonId}
                            initial={reduced ? false : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={reduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
                            transition={{ duration: reduced ? 0 : 0.25 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <p
                              style={{
                                color: brand.textOnDarkSecondary,
                                fontSize: '0.92rem',
                                fontFamily: 'var(--font-body)',
                                lineHeight: 1.65,
                                margin: '0 0 0.4rem',
                              }}
                            >
                              {step.detail}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}
              </ol>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '1.25rem',
                paddingTop: '1rem',
                borderTop: `1px solid ${withAlpha(brand.ochreLight, 0.08)}`,
              }}
            >
              <StepButton
                direction="previous"
                disabled={activeStep === 0}
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              />

              <span
                aria-live="polite"
                style={{
                  fontSize: '0.85rem',
                  color: brand.textOnDarkMuted,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                Step {activeStep + 1} of {pathway.steps.length}
              </span>

              <StepButton
                direction="next"
                disabled={activeStep === pathway.steps.length - 1}
                onClick={() => setActiveStep(Math.min(pathway.steps.length - 1, activeStep + 1))}
              />
            </div>

            <Legend
              title="Spread mechanism"
              style={{ marginTop: '1.25rem' }}
              items={MECHANISM_ORDER.map(mechanism => ({
                color: MECHANISM_COLORS[mechanism],
                label: `${MECHANISM_MARKERS[mechanism]} ${MECHANISM_LABELS[mechanism]}`,
                dimmed: mechanism !== pathway.mechanism,
              }))}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && (
        <div
          style={{
            textAlign: 'center',
            padding: '2.5rem 1rem',
            color: brand.textOnDarkMuted,
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
          }}
        >
          Select a language above to trace its 6,000-year journey from the steppe.
        </div>
      )}
    </div>
  )
}

interface StepButtonProps {
  direction: 'previous' | 'next'
  disabled: boolean
  onClick: () => void
}

/** Previous/next control for the step walker. */
function StepButton({ direction, disabled, onClick }: StepButtonProps) {
  const isPrevious = direction === 'previous'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrevious ? 'Previous step' : 'Next step'}
      style={{
        background: disabled ? withAlpha(brand.teal, 0.05) : withAlpha(brand.teal, 0.15),
        border: `1px solid ${withAlpha(brand.teal, disabled ? 0.15 : 0.4)}`,
        borderRadius: 8,
        color: disabled ? brand.textOnDarkMuted : brand.textOnDark,
        cursor: disabled ? 'default' : 'pointer',
        padding: '0.5rem 1.1rem',
        minHeight: 40,
        fontSize: '0.9rem',
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        opacity: disabled ? 0.5 : 1,
        transition: 'background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
      }}
    >
      {isPrevious && <span aria-hidden="true">&larr;</span>}
      {isPrevious ? 'Previous' : 'Next'}
      {!isPrevious && <span aria-hidden="true">&rarr;</span>}
    </button>
  )
}
