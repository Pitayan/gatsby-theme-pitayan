import React, { memo } from "react"
import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"

const HomeSlogan: React.FC = () => {
  const { siteSlogan } = useSiteMetadata()

  return (
    <div className="max-w-2xl">
      <h1 className="font-bold font-sans leading-tight md:leading-tight md:text-5xl text-4xl">
        {siteSlogan}
      </h1>
    </div>
  )
}

export default memo(HomeSlogan)
