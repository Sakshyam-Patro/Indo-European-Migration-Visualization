import type { CSSProperties } from 'react';

interface InteractiveLabelProps {
  className?: string;
  /** Optional style overrides — e.g. to tweak the bottom margin per layout. */
  style?: CSSProperties;
}

/**
 * Canonical "Interactive" cue shown above every interactive visualization.
 * Deliberately quiet: plain sentence-case text with a small pointer, no pill,
 * so it marks the block without competing with its heading. Keep this the
 * single source of truth — do not hand-roll copies in individual components.
 */
export function InteractiveLabel({ className, style }: InteractiveLabelProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        marginBottom: '0.6rem',
        fontSize: '0.85rem',
        lineHeight: 1.2,
        color: 'var(--teal-soft)',
        fontFamily: 'var(--font-body)',
        ...style,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
        <path d="M1.5 1l9 3.6-3.7 1.5L5.3 9.8z" />
      </svg>
      Interactive
    </div>
  );
}

export default InteractiveLabel;
