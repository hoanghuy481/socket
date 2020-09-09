import React, { useRef } from 'react';
import { isEmpty as _isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const InputForm = ({ isTyping, stopTyping }) => {
  const text = useRef('');

  const onChange = () => {
    if (!_isEmpty(text.current.value)) {
      isTyping();
    } else {
      stopTyping();
    }
  };

  return (
    <div className="message-input">
      <TextField
        className="inputField"
        label="Type your message here..."
        placeholder="Enter your message and press ENTER"
        inputRef={text}
        margin="normal"
        style={{ height: '30px', width: '80%' }}
        onChange={onChange}
      />

      <Button variant="contained" color="primary">
        Send
      </Button>
    </div>
  );
};

InputForm.propTypes = {
  isTyping: PropTypes.func,
  stopTyping: PropTypes.func,
};

export default InputForm;
