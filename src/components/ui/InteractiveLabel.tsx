import type { CSSProperties } from 'react';

interface InteractiveLabelProps {
  className?: string;
  /** Optional style overrides — e.g. to tweak the bottom margin per layout. */
  style?: CSSProperties;
}

/**
 * Canonical "Interactive" pill badge shown above every interactive
 * visualization. Keep this the single source of truth — do not hand-roll
 * copies in individual components.
 */
export function InteractiveLabel({ className, style }: InteractiveLabelProps) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.3rem 0.8rem',
        background: 'rgba(13, 115, 119, 0.15)',
        border: '1px solid rgba(13, 115, 119, 0.3)',
        borderRadius: 20,
        marginBottom: '1rem',
        fontSize: '0.75rem',
        color: 'var(--teal-light)',
        fontFamily: 'var(--font-body)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        ...style,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--teal-light)',
          display: 'inline-block',
        }}
      />
      Interactive
    </div>
  );
}

export default InteractiveLabel;
