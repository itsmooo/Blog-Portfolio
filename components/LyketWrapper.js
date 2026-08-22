import { Provider } from '@lyket/react'
import siteMetadata from '@/data/siteMetadata'

const defaultTheme = {
  colors: {
    primary: '#71717a',
    secondary: '#ff00c3',
    text: '#fff',
    highlight: '#ff00c3',
    icon: '#fff',
    background: 'transparent',
  },
  fonts: {
    body: 'inherit',
  },
}

export default function LyketWrapper({ children }) {
  const apiKey = siteMetadata.lyket?.publicKey

  if (!apiKey) {
    return children
  }

  return (
    <Provider apiKey={apiKey} theme={defaultTheme}>
      {children}
    </Provider>
  )
}
