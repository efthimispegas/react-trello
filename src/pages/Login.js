import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import { Button, Container, CssBaseline, Typography, TextField, Grid, ThemeProvider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from '../utils/formStyles';
import Navbar from '../components/Navbar';


const Login = () => {
  const classes = useStyles();
  const [ formData, setFormData ] = useState({ email: '', password: '' });

  const { email, password } = formData;


  const onSubmit = e => {
    e.preventDefault();
    console.log('===============');
    console.log('[Login] data:',formData);
    console.log('===============');
  };

  const onChange = e => {
    setFormData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  return (
    <Fragment>
      <Navbar />
      <Container component='main' maxWidth='xs' className={classnames(classes.container, 'auth')}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h4'>React Trello</Typography>
        <Typography component='h1' variant='h5'>Sign In</Typography>
      </div>
      <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={onChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={onChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify='flex-end' className={classes.grid}>
            <Grid item>
              <Link to='/register' variant='body2'>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
    </Container>
    </Fragment>
);
};

export default Login;
