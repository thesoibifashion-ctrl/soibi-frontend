import TrackingPage from '@/views/history/tracking-page/Tracking'
import  { Suspense } from 'react'

const page = () => {
  return (
    <Suspense><TrackingPage/></Suspense>
  )
}

export default page