export const getEnvProduction = () => {
  return process.env.NODE_ENV === 'production'
}

export const getEnvWSUrl = (): string | undefined => {
  return process.env.REACT_APP_WS_URL
}
