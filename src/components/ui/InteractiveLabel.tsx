interface InteractiveLabelProps {
  className?: string;
}

export function InteractiveLabel({ className }: InteractiveLabelProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontSize: '0.7rem',
        fontFamily: 'var(--font-body)',
        color: 'var(--teal)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontWeight: 600,
        userSelect: 'none',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--teal)',
          boxShadow: '0 0 4px var(--teal)',
        }}
      />
      Interactive
    </span>
  );
}

export default InteractiveLabel;
