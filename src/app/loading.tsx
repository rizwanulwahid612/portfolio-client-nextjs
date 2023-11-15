import { Spin } from 'antd'
import React from 'react'

const loading = () => {
  return (
    <div className='flex justify-center items-center min-h screen'>
    <Spin size='large'/>
    </div>
   
  )
}

export default loading