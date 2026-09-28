import MobilePayPage from '@/views/checkout/MobilePay'
import { Suspense } from 'react'

const page = () => {
  return <Suspense fallback={null}><MobilePayPage/></Suspense> 
}

export default page