import React from "react"
import {
  SiNotion,
  SiUnsplash,
  SiBuymeacoffee,
  SiMaildotru,
  SiBehance,
  SiFacebook,
  SiTwitter,
  SiGithub,
  SiDribbble,
  SiLinkedin,
  SiInstagram,
  SiDevdotto,
  SiStackoverflow,
  SiYoutube,
  SiMedium,
  SiPaypal,
  SiPatreon,
  SiDigitalocean,
  SiTripadvisor,
} from "react-icons/si"
import { FiExternalLink } from "react-icons/fi"

type SocialIconsProps = {
  icon: string
  className?: string
}

type SocialGroupProps = {
  data: [string, string][]
  className?: string
}

const icons = {
  behance: {
    icon: SiBehance,
    url: "https://www.behance.net",
  },
  dribbble: {
    icon: SiDribbble,
    url: "https://dribbble.com",
  },
  linkedin: {
    icon: SiLinkedin,
    url: "https://www.linkedin.com/in",
  },
  twitter: {
    icon: SiTwitter,
    url: "https://twitter.com",
  },
  facebook: {
    icon: SiFacebook,
    url: "https://www.facebook.com",
  },
  instagram: {
    icon: SiInstagram,
    url: "https://www.instagram.com",
  },
  devto: {
    icon: SiDevdotto,
    url: "https://dev.to",
  },
  github: {
    icon: SiGithub,
    url: "https://github.com",
  },
  stackoverflow: {
    icon: SiStackoverflow,
    url: "https://stackoverflow.com/users",
  },
  youtube: {
    icon: SiYoutube,
    url: "https://www.youtube.com/channel",
  },
  medium: {
    icon: SiMedium,
    url: "https://medium.com",
  },
  notion: {
    icon: SiNotion,
    url: "",
  },
  unsplash: {
    icon: SiUnsplash,
    url: "https://unsplash.com",
  },
  patreon: {
    icon: SiPatreon,
    url: "https://www.patreon.com",
  },
  paypal: {
    icon: SiPaypal,
    url: "",
  },
  digitalocean: {
    icon: SiDigitalocean,
    url: "https://www.digitalocean.com/blog/author",
  },
  tripadvisor: {
    icon: SiTripadvisor,
    url: "https://www.tripadvisor.com",
  },
  buymeacoffee: {
    icon: SiBuymeacoffee,
    url: "https://www.buymeacoffee.com",
  },
  mailto: {
    icon: SiMaildotru,
    url: "",
  },
  url: {
    icon: FiExternalLink,
    url: "",
  },
}

const SocialIcon: React.FC<SocialIconsProps> = ({ icon, className }) => {
  const Icon = icons[icon].icon

  return <Icon className={className} />
}

const SocialGroup: React.FC<SocialGroupProps> = ({ data, className }) => {
  return (
    <ul className={`list-none flex flex-wrap space-x-8 ${className}`}>
      {data.map(([sns, profile]) => {
        let href = `${icons[sns]?.url}/${profile}`

        // Use the given url If the given platform id is an HTTP url.
        if (/^(?:https?:\/\/)/.test(profile)) {
          href = profile
        }

        return (
          <li key={sns}>
            <a
              className="text-gray-500"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon className="h-6 w-6" icon={sns} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialGroup
