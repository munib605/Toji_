import { Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'

const Home = lazy(() => import('@/pages/Home'))

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-accent-violet" />
    </div>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg">
      <ScrollProgress />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <main>
          <Home />
        </main>
      </Suspense>
      <Footer />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0B1120',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
    </div>
  )
}
