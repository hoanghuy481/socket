import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const InputForm = () => {
  const text = useRef('');

  // const onChange = e => {
  //   setText(e.target.value);
  // };

  return (
    <div className="message-input">
      <TextField
        className="inputField"
        label="Type your message here..."
        placeholder="Enter your message and press ENTER"
        inputRef={text}
        margin="normal"
        style={{ height: '30px', width: '80%' }}
      />

      <Button variant="contained" color="primary">
        Send
      </Button>
    </div>
  );
};

InputForm.propTypes = {
  // onSubmit: PropTypes.func,
};

export default InputForm;
