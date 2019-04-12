import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div>
    404 - The page you were looking for {"isn't"} here!{' '}
    <Link to="/">Go home.</Link>
  </div>
)

export default NotFoundPage
