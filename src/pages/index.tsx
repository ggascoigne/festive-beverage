import type { NextPage } from 'next'

import { HomeView } from '#views'

const Home: NextPage = () => <HomeView />

export default Home

export async function getServerSideProps() {
  const { ssrHelpers } = await import('#server/api/ssr')

  await ssrHelpers.drinks.getAllDrinks.prefetch()
  await ssrHelpers.drinks.getAllIngredients.prefetch()

  console.log('in getServerSideProps')
  return {
    props: {
      trpcState: ssrHelpers.dehydrate(),
    },
  }
}
