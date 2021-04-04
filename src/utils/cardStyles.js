import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 260,
    margin: theme.spacing(0.5, 0.2)
  },
  modal: {
    padding: theme.spacing(2)
  },
  // Also class of the modal for create card
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3, 3, 8, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    borderRadius: 8,
    maxWidth: 800,
    maxHeight: 600,
    color: 'black',
    backgroundColor: 'snow',
    outline: 'none'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'nowrap'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  description: {
    color: '#8d8d8d',
    fontSize: 14,
    margin: 1
  },
  button: {
    marginTop: theme.spacing(2),
  },
  cta: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  move: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2)
  },
  select: {
    marginTop: 20,
    marginRight: 20,
    width: 200,
  },

}));

export default useStyles;
