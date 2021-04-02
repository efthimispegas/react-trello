import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 260,
    margin: theme.spacing(0.5, 0.2)
  },
  modal: {
    padding: theme.spacing(16)
  },
  // Also class of the modal for create card
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3, 1, 8, 1),
    borderRadius: 20,
    maxWidth: 800,
    maxHeight: 600,
    color: 'black',
    backgroundColor: 'snow',
    outline: 'none'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  title: {
    fontSize: 14,
  },
  button: {
    marginTop: theme.spacing(6),
  }
}));

export default useStyles;
