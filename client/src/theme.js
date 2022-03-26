import {
  createTheme,
  responsiveFontSizes
} from '@mui/material/styles'

let theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#eeeeee'
    }
  }
})

theme = responsiveFontSizes(theme)

export default theme