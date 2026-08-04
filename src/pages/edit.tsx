import type { NextPage } from 'next'

import { EditView } from '@/views'

const EditPage: NextPage = () => <EditView />

export default EditPage

export async function getServerSideProps() {
  const { ssrHelpers } = await import('@/server/api/ssr')

  await Promise.all([
    ssrHelpers.drinks.getAllDrinks.prefetch(),
    ssrHelpers.drinks.getAllIngredients.prefetch(),
    ssrHelpers.drinks.getAllUnits.prefetch(),
  ])

  return {
    props: {
      trpcState: ssrHelpers.dehydrate(),
    },
  }
}
