import React from "react"
import { Link } from "gatsby"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"

const NotFound: React.FC<any> = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full text-center h-72">
        <p>Not Found</p>
        <br />
        <h1 className="text-7xl">404</h1>
        <p>Sorry, what you are looking for may be moved or deleted.</p>
        <br />
        <br />
        <br />
        <Link className="site-link" to="/">
          home
        </Link>
      </div>
    </DefaultLayout>
  )
}

export default NotFound
