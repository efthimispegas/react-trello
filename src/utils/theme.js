import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      'input': {
        color: 'white'
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
