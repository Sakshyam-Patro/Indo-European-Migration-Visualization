import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Height of the ScrollProgress bar this header sits beneath. */
export const PROGRESS_BAR_HEIGHT = 3

interface HeaderProps {
  visible: boolean
  activeSection: string
  sections: { id: string; label: string }[]
}

export function Header({ visible, activeSection, sections }: HeaderProps) {
  const reduced = useReducedMotion()

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={reduced ? false : { y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: -60, opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            top: PROGRESS_BAR_HEIGHT,
            left: 0,
            width: '100%',
            zIndex: 40,
            backgroundColor: 'color-mix(in srgb, var(--bg-deep) 90%, transparent)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0.25rem 1.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                color: 'var(--text-bright)',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}
            >
              Indo-European Explorer
            </span>

            <nav aria-label="Sections" style={{ display: 'flex', alignItems: 'center' }}>
              {sections.map(section => {
                const isActive = activeSection === section.id
                return (
                  <button
                    key={section.id}
                    onClick={() => handleNavClick(section.id)}
                    title={section.label}
                    aria-label={section.label}
                    aria-current={isActive ? 'location' : undefined}
                    style={{
                      // The dot stays small; the button keeps a 28px target.
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        width: isActive ? 10 : 7,
                        height: isActive ? 10 : 7,
                        borderRadius: '50%',
                        backgroundColor: isActive ? 'var(--teal-light)' : 'var(--text-on-dark-muted)',
                        boxShadow: isActive ? '0 0 6px var(--teal-light)' : 'none',
                        transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease',
                      }}
                    />
                  </button>
                )
              })}
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}

export default Header
