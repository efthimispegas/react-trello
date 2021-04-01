import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    maxWidth: '100vw',
    padding: '20px',
    background: 'linear-gradient(135deg, #0079bf, #5067c5)',
  },
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '0.5px solid white',
    borderRadius: 20,
    maxWidth: '500px',
    color: 'white',
  },
  form: {
    borderRadius: 20,
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  grid: {
    margin: theme.spacing(1, 0, 2)
  }
}));

export default useStyles;
