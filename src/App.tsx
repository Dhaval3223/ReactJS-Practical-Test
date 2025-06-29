import type { ReactNode } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import type { Theme } from '@mui/material/styles'

export default function App({ children, theme }: { children: ReactNode, theme: Theme }) {
  return <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>
}
