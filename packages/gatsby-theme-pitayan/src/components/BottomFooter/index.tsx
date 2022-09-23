import React, { memo } from "react"
import { Link } from "gatsby"
import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"
import NavigationLinksGroup from "@pitayan/gatsby-theme-pitayan/src/components/NavigationLinksGroup"

type BottomFooterProps = {
  className?: string
}

const BottomFooter: React.FC<BottomFooterProps> = ({
  className = "",
}) => {
  const year = new Date().getFullYear()
  const { siteLinks, name, siteDescription } = useSiteMetadata()

  return (
    <footer className={className}>
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col justify-between w-96">
          <h1 className="font-black">
            {name}
            <br />
            <small className="text-sm text-gray-500 dark:text-gray-400">
              {siteDescription}
            </small>
          </h1>
        </div>
        <div className="flex flex-wrap justify-between grow">
          <div className="space-y-2 text-base">
            <h5 className="font-bold mb-3">Explore</h5>
            <Link className="site-link block" to="/">
              home
            </Link>
            <Link className="site-link block" to="/posts">
              posts
            </Link>
            <Link className="site-link block" to="/categories">
              categories
            </Link>
            <Link className="site-link block" to="/authors">
              authors
            </Link>
            <NavigationLinksGroup group="explore" data={siteLinks} />
          </div>
          <div className="space-y-2 text-base">
            <h5 className="font-bold mb-3">Site</h5>
            <NavigationLinksGroup group="site" data={siteLinks} />
          </div>
          <div className="space-y-2 text-base">
            <h5 className="font-bold mb-3">Connect</h5>
            <NavigationLinksGroup group="connect" data={siteLinks} />
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-500 font-bold dark:text-gray-400 mt-8 mb-16">
        &copy; {year} {name}. All rights reserved.
      </div>
    </footer>
  )
}

export default memo(BottomFooter)
