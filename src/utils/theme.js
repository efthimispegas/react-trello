import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        padding: 4
      }
    },
    MuiButton: {
      root: {
        minWidth: 24
      }
    },
    MuiInputBase: {
      'input': {
        color: '#333'
      },
    }
  }
});

export default theme;
