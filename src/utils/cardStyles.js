import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 260,
    margin: theme.spacing(0.5, 0.2)
  },
  modal: {
    padding: theme.spacing(16)
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(8),
    borderRadius: 20,
    maxWidth: '800px',
    color: 'black',
    backgroundColor: 'snow'
  },
  title: {
    fontSize: 14,
  },
  button: {
    marginTop: theme.spacing(2)
  },
}));

export default useStyles;
