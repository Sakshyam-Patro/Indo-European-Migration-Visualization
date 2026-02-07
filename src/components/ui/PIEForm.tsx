interface PIEFormProps {
  root: string;
  className?: string;
}

export function PIEForm({ root, className }: PIEFormProps) {
  return (
    <span
      className={className}
      style={{
        fontStyle: 'italic',
        color: 'var(--ochre)',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          color: 'var(--teal)',
          fontStyle: 'normal',
          fontWeight: 700,
        }}
      >
        *
      </span>
      {root}
    </span>
  );
}

export default PIEForm;
