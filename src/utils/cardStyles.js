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
    marginTop: theme.spacing(2),
  },
  icon: {
    color: 'lightgrey'
  }
}));

export default useStyles;
