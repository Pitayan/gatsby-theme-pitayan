import React from "react"

type HomeHeroProps = {
  [key: string]: any
}

// TODO: Make component dynamic
const HomeHero: React.FC<HomeHeroProps> = () => {
  return (
    <div className="max-w-2xl">
      <h1 className="font-bold font-sans leading-tight md:leading-tight md:text-5xl text-4xl">
        Welcome to Pitayan, come find inspiring software development stories.
      </h1>
    </div>
  )
}

export default HomeHero
