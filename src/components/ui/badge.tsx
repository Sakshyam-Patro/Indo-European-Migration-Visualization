import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

/**
 * Standard shadcn/ui Badge primitive, adapted to this project's design tokens
 * (see src/index.css). Add new variants here rather than hand-rolling badge
 * markup in feature components.
 */
const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1.5 w-fit shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium [&>svg]:size-3 [&>svg]:pointer-events-none transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--teal)] text-white',
        secondary:
          'border-transparent bg-[var(--bg-elevated)] text-[var(--text-on-dark)]',
        destructive:
          'border-transparent bg-[var(--sienna)] text-white',
        outline:
          'border-[var(--bronze-dark)] text-[var(--text-on-dark-secondary)]',
        // Subtle teal "eyebrow" used to flag interactive visualizations.
        interactive:
          'border-[var(--teal-dark)] bg-[color-mix(in_oklab,var(--teal)_18%,transparent)] text-[var(--teal-light)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
