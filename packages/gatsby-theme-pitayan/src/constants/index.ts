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
import { IconType } from "react-icons/lib"

export const SOCIAL_RESOURCES: {
  [key: string]: {
    icon: IconType
    url: string
  }
} = {
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
