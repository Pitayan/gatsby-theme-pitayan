import {
  SiNotion,
  SiBuymeacoffee,
  SiDevdotto,
} from "react-icons/si"
import {
  RiUnsplashFill,
  RiMailFill,
  RiBehanceFill,
  RiFacebookCircleFill,
  RiTwitterFill,
  RiGithubFill,
  RiDribbbleFill,
  RiLinkedinFill,
  RiInstagramFill,
  RiStackOverflowFill,
  RiYoutubeFill,
  RiMediumFill,
  RiPaypalFill,
  RiPatreonFill,
  RiExternalLinkFill,
} from "react-icons/ri"
import {
  FaTripadvisor,
  FaGetPocket,
  FaDigitalOcean,
} from "react-icons/fa"
import { IconType } from "react-icons/lib"

export const SOCIAL_RESOURCES: Record<string, { icon: IconType, url: string }> = {
  behance: {
    icon: RiBehanceFill,
    url: "https://www.behance.net",
  },
  dribbble: {
    icon: RiDribbbleFill,
    url: "https://dribbble.com",
  },
  linkedin: {
    icon: RiLinkedinFill,
    url: "https://www.linkedin.com/in",
  },
  twitter: {
    icon: RiTwitterFill,
    url: "https://twitter.com",
  },
  facebook: {
    icon: RiFacebookCircleFill,
    url: "https://www.facebook.com",
  },
  instagram: {
    icon: RiInstagramFill,
    url: "https://www.instagram.com",
  },
  devto: {
    icon: SiDevdotto,
    url: "https://dev.to",
  },
  github: {
    icon: RiGithubFill,
    url: "https://github.com",
  },
  stackoverflow: {
    icon: RiStackOverflowFill,
    url: "https://stackoverflow.com/users",
  },
  youtube: {
    icon: RiYoutubeFill,
    url: "https://www.youtube.com/channel",
  },
  medium: {
    icon: RiMediumFill,
    url: "https://medium.com",
  },
  notion: {
    icon: SiNotion,
    url: "",
  },
  unsplash: {
    icon: RiUnsplashFill,
    url: "https://unsplash.com",
  },
  patreon: {
    icon: RiPatreonFill,
    url: "https://www.patreon.com",
  },
  paypal: {
    icon: RiPaypalFill,
    url: "",
  },
  pocket: {
    icon: FaGetPocket,
    url: "",
  },
  digitalocean: {
    icon: FaDigitalOcean,
    url: "https://www.digitalocean.com/blog/author",
  },
  tripadvisor: {
    icon: FaTripadvisor,
    url: "https://www.tripadvisor.com",
  },
  buymeacoffee: {
    icon: SiBuymeacoffee,
    url: "https://www.buymeacoffee.com",
  },
  mailto: {
    icon: RiMailFill,
    url: "",
  },
  url: {
    icon: RiExternalLinkFill,
    url: "",
  },
}


export const COOKIE_PROMPT_CONTAINER_ID = "cookie-prompt-container"
export const COOKIE_PROMPT_AGREEMENT = "site-cookie-consent-agreement"
export const COOKIE_PROMPT_DEFAULT_TITLE = "This site uses cookies"
export const COOKIE_PROMPT_DEFAULT_DESCRIPTION = `
We use 3rd party tools to understand visitors and create a
personalized experience. By clicking "Agree" button below,
you agree to allowing us to storage cookies on your browser.
`
export const COOKIE_PROMPT_DEFAULT_READMORE = "Read more on"
export const SUBSCRIPTION_DEFAULT_TITLE = "Subscribe to our email newsletters"
export const SUBSCRIPTION_DEFAULT_DESCRIPTION = `
Stay tuned to our latest content with the ability to opt-out at
anytime. We will not spam your inbox or share your email with any
third parties.
`

export const CUSTOM_EVENT_SUBSCRIPTION = "CUSTOM_EVENT_SUBSCRIPTION"
export const CUSTOM_EVENT_SOCIAL_SHARING = "CUSTOM_EVENT_SOCIAL_SHARING"
export const CUSTOM_EVENT_TOGGLE_THEME = "CUSTOM_EVENT_TOGGLE_THEME"
