import type { CSSProperties } from 'react';
import { Badge } from './badge';
import { cn } from '../../lib/utils';

interface InteractiveLabelProps {
  className?: string;
  /** Optional style overrides — e.g. to tweak the bottom margin per layout. */
  style?: CSSProperties;
}

/**
 * "Interactive" eyebrow shown above every interactive visualization.
 * Built on the standard Badge primitive (ui/badge.tsx) so the shape and
 * styling stay consistent everywhere — do not hand-roll badge markup.
 */
export function InteractiveLabel({ className, style }: InteractiveLabelProps) {
  return (
    <Badge
      variant="interactive"
      style={style}
      className={cn('mb-4 uppercase tracking-[0.1em] font-semibold', className)}
    >
      <span
        className="size-1.5 rounded-full bg-current"
        aria-hidden="true"
      />
      Interactive
    </Badge>
  );
}

export default InteractiveLabel;
