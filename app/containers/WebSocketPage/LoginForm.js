import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginForm = ({ onSubmit }) => {
  const username = useRef('');

  const handleSubmit = () => {
    onSubmit(username.current.value);
  };

  return (
    <div>
      <TextField
        label="Type your username"
        placeholder="Username"
        inputRef={username}
        margin="normal"
        onKeyPress={event => {
          if (event.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;
