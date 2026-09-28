import CheckoutPage from "@/views/checkout/Index"
import { Suspense } from "react"

const page = () => {
  return   <Suspense fallback={null}><CheckoutPage/></Suspense>
}

export default page