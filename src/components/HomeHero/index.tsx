import React from 'react'

const HomeHero: React.FC<Record<string, unknown>> = () => {

  return (
    <div className="max-w-2xl mb-12">
      <h1 className="font-bold font-sans leading-tight md:leading-tight md:text-5xl text-4xl">
        Welcome to Pitayan, come find inspiring software development stories.
      </h1>
    </div>
  )
}

export default HomeHero

