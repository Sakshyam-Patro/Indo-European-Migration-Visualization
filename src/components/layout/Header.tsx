import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  visible: boolean;
  activeSection: string;
  sections: { id: string; label: string }[];
}

export function Header({ visible, activeSection, sections }: HeaderProps) {
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            top: 3, // below the scroll progress bar
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
              padding: '0.6rem 1.5rem',
            }}
          >
            {/* Site Title */}
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

            {/* Navigation Dots */}
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleNavClick(section.id)}
                    title={section.label}
                    aria-label={`Navigate to ${section.label}`}
                    aria-current={isActive ? 'true' : undefined}
                    style={{
                      width: isActive ? '10px' : '7px',
                      height: isActive ? '10px' : '7px',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      backgroundColor: isActive
                        ? 'var(--teal)'
                        : 'var(--text-muted)',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive
                        ? '0 0 6px var(--teal)'
                        : 'none',
                    }}
                  />
                );
              })}
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

export default Header;
