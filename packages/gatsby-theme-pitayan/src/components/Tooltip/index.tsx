import React, { memo } from "react"

type TooltipProps = React.PropsWithChildren<{
  active?: boolean
  text?: string
  className?: string
}>

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text = "",
  active,
  className = "",
}) => {
  return (
    <span
      className={`tooltip tooltip-top-center ${
        active ? "active" : ""
      } ${className}`}
    >
      {children}
      <span className="tooltip-container transition-color delay-100 duration-200 ease rounded text-sm bg-gray-200 dark:bg-gray-800">
        <span className="whitespace-pre">{text}</span>
      </span>
    </span>
  )
}

export default Tooltip
