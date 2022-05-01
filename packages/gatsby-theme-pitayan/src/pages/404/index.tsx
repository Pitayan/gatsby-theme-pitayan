import React, { memo } from "react"
import { Link } from "gatsby"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"

const NotFound: React.FC = () => {
  const { siteUrl } = useSiteMetadata()

  return (
    <DefaultLayout pageUrl={`${siteUrl}/404`} pageTitle="404" noIndex>
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

export default memo(NotFound)
