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
    },
    MuiInputLabel: {
      'root': {
        color: 'white',
        '&$focused': {
          color: 'white'
        }
      },
    }
  }
});

export default theme;
