import React, { memo } from "react"
import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"
import NavigationLinksGroup from "@pitayan/gatsby-theme-pitayan/src/components/NavigationLinksGroup"

const HomeLinks: React.FC = () => {
  const { links } = useSiteMetadata()

  return (
    <div className="flex flex-wrap">
      <NavigationLinksGroup group="home" data={links} className="mr-6 py-2" />
    </div>
  )
}

export default memo(HomeLinks)