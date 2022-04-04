declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare var __MAILCHIMP_ENDPOINT__: string
declare var __MAILCHIMP_TIMEOUT__: number
