import React, { memo } from "react"
import { useSiteMetadata } from "../../utils"

const HomeHero: React.FC = () => {
  const { description } = useSiteMetadata()

  return (
    <div className="max-w-2xl">
      <h1 className="font-bold font-sans leading-tight md:leading-tight md:text-5xl text-4xl">
        {description}
      </h1>
    </div>
  )
}

export default memo(HomeHero)
