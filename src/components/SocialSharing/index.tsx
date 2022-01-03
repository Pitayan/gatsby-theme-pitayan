import React from 'react'
import { FiFacebook, FiLinkedin, FiTwitter, FiPocket } from 'react-icons/fi'

type Props = {
  [key: string]: any
}

const SocialSharing: React.FC<Props> = (props: Props) => {

  const onTwitterClick = () => {}

  return (
    <span className="flex space-x-8">
      <FiTwitter className="cursor-pointer" onClick={onTwitterClick} />
      <FiFacebook className="cursor-pointer" />
      <FiLinkedin className="cursor-pointer" />
      <FiPocket className="cursor-pointer" />
    </span>
  )
}

export default SocialSharing

