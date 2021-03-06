import { CSSProperties } from '@mui/material'

declare module '@mui/material/styles/createMixins' {
  interface BoxShadows {
    primary: CSSProperties['boxShadow']
    secondary: CSSProperties['boxShadow']
    error: CSSProperties['boxShadow']
    warning: CSSProperties['boxShadow']
    info: CSSProperties['boxShadow']
    success: CSSProperties['boxShadow']
    page: CSSProperties['boxShadow']
  }

  interface Mixins {
    gutters: (styles?: CSSProperties) => CSSProperties
    toolbar: CSSProperties
    boxShadow: BoxShadows
  }

  interface MixinsOptions extends Partial<Mixins> {
    boxShadow: BoxShadows
  }
}

declare module '@mui/material' {
  interface ThemeExtension {
    backgroundSlightlyDarker: CSSProperties['color']
    bannerShadow: CSSProperties['boxShadow']
    bodyToolbarScrim: CSSProperties['width']
    bodyToolbarWidth: CSSProperties['width']
    borderStandard: CSSProperties['color']
  }

  interface Theme {
    constants: ThemeExtension
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    constants?: Partial<ThemeExtension>
  }
}
