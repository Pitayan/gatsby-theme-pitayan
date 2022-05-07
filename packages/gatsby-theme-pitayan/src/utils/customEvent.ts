
export const dispatchCustomEvent = (eventName: string, detail: CustomEvent['detail']) => {
  const event = new CustomEvent(eventName, { detail })

  document.dispatchEvent(event)
}
