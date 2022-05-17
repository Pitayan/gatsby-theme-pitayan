import React, { memo } from "react"
import { Link } from "gatsby"
import DarkModeToggle from "@pitayan/gatsby-theme-pitayan/src/components/DarkModeToggle"
import SiteLogo from "@pitayan/gatsby-theme-pitayan/src/components/SiteLogo"
import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"

type TopNavProps = {
  className?: string
}

const TopNav: React.FC<TopNavProps> = ({
  className = "",
}) => {
  const { name, title, icon } = useSiteMetadata()

  return (
    <nav className={`block flex justify-between content-center ${className}`}>
      <Link to="/" className="flex space-x-3 items-center">
        <SiteLogo className="h-8 w-8" alt={title} icon={icon} />
        <b className="font-serif font-extrabold tracking-wide text-2xl hidden md:block">
          {name}
        </b>
      </Link>
      <div className="flex space-x-8 text-3xl items-center">
        <DarkModeToggle />
      </div>
    </nav>
  )
}

export default memo(TopNav)
