import { FileRoutes, Router, ShopifyProvider } from '@shopify/hydrogen'
import renderHydrogen from '@shopify/hydrogen/entry-server'
import { Suspense } from 'react'
import './index.css'

function App() {
  return (
    <Suspense fallback={<>loading...</>}>
      <ShopifyProvider>
        <Router>
          <FileRoutes />
        </Router>
      </ShopifyProvider>
    </Suspense>
  )
}

export default renderHydrogen(App)
