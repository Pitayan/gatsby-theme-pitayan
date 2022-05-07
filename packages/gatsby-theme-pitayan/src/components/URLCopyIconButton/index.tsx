import React, { memo } from "react"
import { RiLinkM } from "react-icons/ri"
import { copyToClipboard } from "@pitayan/gatsby-theme-pitayan/src/utils"

const URLCopyIconButton: React.FC = () => {
  const copyOnClick = () => {
    copyToClipboard(window.location.href)
  }

  return (
    // RiLinkM looks slightly smaller than other icons, adjust its size to meet the balance
    <a className="site-link text-[110%]" onClick={copyOnClick}>
      <RiLinkM />
    </a>
  )
}

export default memo(URLCopyIconButton)
