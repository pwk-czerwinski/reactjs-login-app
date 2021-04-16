import React, {ChangeEvent, useState} from 'react';
import {
  Avatar, Button, CssBaseline, TextField, Typography, Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUsername(e.target.value);
  }

  const handlePassword = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPassword(e.target.value);
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3333/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => {
      if (response.ok) {
        alert("Success!");
      } else {
        alert("Failed!");
      }
    });
  };

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
          <form className={classes.form} onSubmit={submit}>
            <TextField
                variant="outlined"
                margin="normal"
                id="email"
                label="Username"
                placeholder="Username"
                name="email"
                type="text"
                value={username}
                onChange={handleUsername}
                autoFocus
                required
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
                value={password}
                onChange={handlePassword}
                required
                fullWidth
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                fullWidth
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
  );
};

export default LoginForm;
