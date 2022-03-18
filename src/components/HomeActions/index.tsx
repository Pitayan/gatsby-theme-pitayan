import React from "react"
import { Link } from "gatsby"
import { RiTwitterFill } from "react-icons/ri"

const HomeActions: React.FC<Record<string, unknown>> = () => {
  return (
    <div className="flex flex-wrap text-gray-500">
      <span className="flex items-center space-x-6 pt-2 pr-6">
        <Link className="site-link" to="write-for-us">
          write for us
        </Link>
        <Link className="site-link" to="about">
          about
        </Link>
        <span className="h-4 border-l border-solid border-gray-300"></span>
      </span>
      <span className="flex items-center pt-2">
        <Link className="site-link pr-6" to="subscribe">
          subscribe
        </Link>
        <a
          href="https://twitter.com"
          className="text-2xl"
          target="_blank"
          rel="noreferrer"
        >
          <RiTwitterFill />
        </a>
      </span>
    </div>
  )
}

export default HomeActions
