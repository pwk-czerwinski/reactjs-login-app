import React, { FunctionComponent } from 'react';
import {
  Avatar, Button, CssBaseline, TextField, Typography, Container, Box
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useLoginFormStyles from '../../styles/login/loginFormClasses';
import useLogin from '../../shared/useLogin';

/**
 * This component contains a view which contains two inputs for entering username and password.
 * Below these inputs, the button for sending data is shown.
 */
const LoginForm: FunctionComponent = () => {
  const classes = useLoginFormStyles();
  const {
    formik, errorOccurred, error
  } = useLogin();

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                id="username"
                label="Username"
                placeholder="Username"
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                autoFocus
                fullWidth
            />
            <TextField
                variant="outlined"
                margin="normal"
                id="password"
                label="Password"
                placeholder="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={(formik.touched.password && Boolean(formik.errors.password)) || errorOccurred}
                helperText={(formik.touched.password && formik.errors.password) || error}
                fullWidth
            />
            <Box pt={3}>
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
              >
                Sign In
              </Button>
            </Box>
          </form>
        </div>
      </Container>
  );
};

export default LoginForm;
