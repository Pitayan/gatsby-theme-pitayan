import React from "react"

type TooltipProps = {
  [key: string]: any
}

const Tooltip: React.FC<TooltipProps> = props => {
  const { children, text, active, className } = props

  return (
    <span
      className={`tooltip tooltip-top-center ${
        active ? "active" : ""
      } ${className}`}
    >
      {children}
      <span className="tooltip-container transition-color delay-200 duration-700 ease rounded text-sm bg-gray-200 dark:bg-gray-800">
        <span className="whitespace-pre">{text}</span>
      </span>
    </span>
  )
}

export default Tooltip
