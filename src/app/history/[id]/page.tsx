import HistoryView from '@/views/history/history-view/HistoryView'
import { Suspense } from 'react'

const page = () => {
  return (
   <Suspense><HistoryView/></Suspense>
  )
}

export default page