import AboutPage from "@/views/about/Index"
import { Suspense } from "react"

const page = () => {
  return (
    <Suspense fallback={null}>
    <AboutPage/>
    </Suspense>
  )
}

export default page