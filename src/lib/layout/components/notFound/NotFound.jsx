import React, { memo } from 'react'
import {Result} from '../../../generics'

const NotFound = () => {
  return (
    <Result status='404' title="404" subTitle="Page not found" />
  )
}

export default memo(NotFound);