import { Skeleton } from '@mantine/core'
import React, { Suspense } from 'react'

const MainContainer = React.lazy(() => import('../../modules/main/container/main'))

const Main = () => {
  return (
    <Suspense fallback={ <Skeleton height={50} radius="sm" /> }>
      <MainContainer/>
    </Suspense>
  )
}

export default Main
