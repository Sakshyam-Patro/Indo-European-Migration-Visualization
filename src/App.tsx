import { useMemo, lazy, Suspense } from 'react'
import ScrollProgress from './components/layout/ScrollProgress'
import Header from './components/layout/Header'
import SiteFooter from './components/layout/SiteFooter'
import LazyMount from './components/layout/LazyMount'
import HookSection from './sections/HookSection'
import { useScrollState } from './hooks/useScrollState'
import './App.css'

const DiscoverySection = lazy(() => import('./sections/DiscoverySection'))
const DatingSection = lazy(() => import('./sections/DatingSection'))
const HomelandSection = lazy(() => import('./sections/HomelandSection'))
const FamilyTreeSection = lazy(() => import('./sections/FamilyTreeSection'))
const SpreadSection = lazy(() => import('./sections/SpreadSection'))
const MythologySection = lazy(() => import('./sections/MythologySection'))
const DNASection = lazy(() => import('./sections/DNASection'))
const ExplorerSection = lazy(() => import('./sections/ExplorerSection'))

const SECTIONS = [
  { id: 'hook', label: 'Introduction' },
  { id: 'discovery', label: 'The Discovery' },
  { id: 'dating', label: 'When and Where' },
  { id: 'homeland', label: 'The Homeland' },
  { id: 'family-tree', label: 'The Language Family' },
  { id: 'spread', label: 'How Languages Spread' },
  { id: 'mythology', label: 'Shared Mythology' },
  { id: 'dna', label: 'The DNA Revolution' },
  { id: 'explorer', label: 'Explore the Connections' },
]

const DEFERRED_SECTIONS = [
  { id: 'discovery', Component: DiscoverySection },
  { id: 'dating', Component: DatingSection },
  { id: 'homeland', Component: HomelandSection },
  { id: 'family-tree', Component: FamilyTreeSection },
  { id: 'spread', Component: SpreadSection },
  { id: 'mythology', Component: MythologySection },
  { id: 'dna', Component: DNASection },
  { id: 'explorer', Component: ExplorerSection },
]

function LoadingFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        color: 'var(--text-on-dark-muted)',
        fontFamily: 'var(--font-display)',
        fontSize: '1.25rem',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 40,
          height: 40,
          border: '2px solid var(--bronze)',
          borderTopColor: 'var(--ochre)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem',
        }}
      />
      Loading section
    </div>
  )
}

function App() {
  const { progress, scrollY } = useScrollState()

  const headerVisible = scrollY > window.innerHeight * 0.8

  // Derived from the shared scroll listener rather than a second listener of
  // its own, and computed rather than mirrored into state.
  const activeSection = useMemo(() => {
    const viewportAnchor = scrollY + window.innerHeight / 3
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTIONS[i].id)
      if (el && el.offsetTop <= viewportAnchor) return SECTIONS[i].id
    }
    return SECTIONS[0].id
  }, [scrollY])

  return (
    <>
      <a className="skip-link" href="#discovery">
        Skip to content
      </a>
      <ScrollProgress progress={progress} />
      <Header visible={headerVisible} activeSection={activeSection} sections={SECTIONS} />
      <main>
        <HookSection />
        {DEFERRED_SECTIONS.map(({ id, Component }) => (
          <LazyMount key={id} id={id}>
            <Suspense fallback={<LoadingFallback />}>
              <Component />
            </Suspense>
          </LazyMount>
        ))}
      </main>
      <SiteFooter />
    </>
  )
}

export default App
