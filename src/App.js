import React, { Suspense } from 'react'
import Router from './routes/Router'
import { Result, Skeleton } from './lib/generics'
import { ErrorBoundary } from "react-error-boundary";
import SelectDropdown from './module/book/generics/SearchDropdown';

const App = () => {
  return (
    // <ErrorBoundary fallback={<Result status="500" title="500" subTitle="Sorry, something went wrong." />}>
    //   <Suspense fallback={""}>
    //     <Router />
    //   </Suspense>
    // </ErrorBoundary>

    <SelectDropdown/>
  )
}

export default App