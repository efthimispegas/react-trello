import React, { Fragment, useState } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, Grid, ThemeProvider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from '../utils/formStyles';
import theme from '../utils/theme';
import Navbar from '../components/Navbar';


const Register = () => {
  const classes = useStyles();
  const [ formData, setFormData ] = useState({ name: '', email: '', password: '', password2: '' });

  const { name, email, password, password2 } = formData;


  const onSubmit = e => {
    e.preventDefault();
    console.log('===============');
    console.log('[Register] data:',formData);
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
      <Container component='main' maxWidth='xs' className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h4'>React Trello</Typography>
        <Typography component='h1' variant='h5'>Sign Up</Typography>
      </div>
      <form className={classes.form} onSubmit={onSubmit}>
          <ThemeProvider theme={theme}>
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='name'
                  label='Full Name'
                  name='name'
                  autoFocus
                  value={name}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='email'
                  label='Email Address'
                  type='email'
                  id='email'
                  autoComplete='email'
                  value={email}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password2'
                  label='Confirm Password'
                  type='password'
                  id='password2'
                  value={password2}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </ThemeProvider>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify='flex-end' className={classes.grid}>
            <Grid item>
              <Link to='/login' variant='body2'>
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
    </Container>
    </Fragment>
);
};

export default Register;
