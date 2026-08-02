import { PROGRESS_BAR_HEIGHT } from './Header'

interface ScrollProgressProps {
  /** 0-1 fraction of the document scrolled, supplied by the app-level listener. */
  progress: number
}

export function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: PROGRESS_BAR_HEIGHT,
        backgroundColor: 'var(--bg-deep)',
        zIndex: 50,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          backgroundColor: 'var(--ochre)',
        }}
      />
    </div>
  )
}

export default ScrollProgress
