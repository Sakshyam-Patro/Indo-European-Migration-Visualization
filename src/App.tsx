import { useState, useEffect, lazy, Suspense } from 'react'
import ScrollProgress from './components/layout/ScrollProgress'
import Header from './components/layout/Header'
import HookSection from './sections/HookSection'
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
  { id: 'hook', label: 'Hook' },
  { id: 'discovery', label: 'Discovery' },
  { id: 'dating', label: 'Dating' },
  { id: 'homeland', label: 'Homeland' },
  { id: 'family-tree', label: 'Family Tree' },
  { id: 'spread', label: 'Spread' },
  { id: 'mythology', label: 'Mythology' },
  { id: 'dna', label: 'DNA' },
  { id: 'explorer', label: 'Explorer' },
]

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      color: 'var(--text-on-dark-muted)',
      fontFamily: 'var(--font-display)',
      fontSize: '1.5rem',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40,
          height: 40,
          border: '2px solid var(--bronze)',
          borderTopColor: 'var(--ochre)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem',
        }} />
        Loading...
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('hook')
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHeaderVisible(window.scrollY > window.innerHeight * 0.8)

      const sections = SECTIONS.map(s => ({
        id: s.id,
        el: document.getElementById(s.id),
      })).filter(s => s.el)

      const viewportCenter = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el!
        if (el.offsetTop <= viewportCenter) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <ScrollProgress />
      <Header
        visible={headerVisible}
        activeSection={activeSection}
        sections={SECTIONS}
      />
      <main>
        <HookSection />
        <Suspense fallback={<LoadingFallback />}>
          <DiscoverySection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <DatingSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <HomelandSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <FamilyTreeSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <SpreadSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <MythologySection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <DNASection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <ExplorerSection />
        </Suspense>
      </main>
    </>
  )
}

export default App
