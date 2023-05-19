import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
  return (
    <div>
        <p>Click <Link to="/login">here</Link> to login</p>
    </div>
  )
}

export default Public