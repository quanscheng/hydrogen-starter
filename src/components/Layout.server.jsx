import {
  CacheLong,
  gql,
  Link,
  Seo,
  useShopQuery,
  useUrl
} from '@shopify/hydrogen'
import { Suspense } from 'react'

const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`

export const Layout = ({ children }) => {
  const { pathname } = useUrl()
  const isHome = pathname === '/'

  const {
    data: { shop },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
    preload: true,
  })

  return (
    <>
      <Suspense fallback={<>Layout inside loading...</>}>
        <Seo
          type='defaultSeo'
          data={{
            title: shop.name,
            description: shop.description,
          }}
        />
        <div className='flex flex-col min-h-screen antialiased bg-neutral-50'>
          <div className=''>
            <a
              href='#mainContent'
              className='sr-only'
            >
              Skip to content
            </a>
          </div>
          <header
            role='banner'
            className={`flex items-center h-16 p-6 md:p-8 lg:p-12 sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 antialiased transition shadow-sm ${
              isHome ? 'bg-black/80 text-white' : 'bg-white/80'
            }`}
          >
            <div className='flex gap-12'>
              <Link
                className='font-bold'
                to='/'
              >
                {shop.name}
              </Link>
            </div>
          </header>

          <main
            role='main'
            id='mainContent'
            className='flex-grow'
          >
            {children}
          </main>
        </div>
      </Suspense>
    </>
  )
}
