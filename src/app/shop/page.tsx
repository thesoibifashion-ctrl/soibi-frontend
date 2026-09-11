import ShopPage from "@/views/shop/Index"
import { Suspense } from "react"

const page = () => {
  return (
    <Suspense fallback={null}><ShopPage/></Suspense>
  )
}

export default page