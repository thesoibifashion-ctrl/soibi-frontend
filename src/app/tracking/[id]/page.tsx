import TrackingPage from '@/views/history/tracking-page/Tracking'
import  { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={null}><TrackingPage/></Suspense>
  )
}

export default page