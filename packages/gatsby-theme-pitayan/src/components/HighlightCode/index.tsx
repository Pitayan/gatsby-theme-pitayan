import React from "react"
import Highlight, { defaultProps, Language } from "prism-react-renderer"

type HighlightCodeProps = {
  code: string
  language: Language
}

const HighLightCode: React.FC<HighlightCodeProps> = ({ code, language }) => {
  return (
    <Highlight {...defaultProps} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default HighLightCode
