import React, { useRef } from 'react';
import { isEmpty as _isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

const InputForm = ({ isTyping, stopTyping, usersIsTyping }) => {
  const text = useRef('');

  const onChange = () => {
    if (!_isEmpty(text.current.value)) {
      isTyping();
    } else {
      setTimeout(() => {
        stopTyping();
      }, 2000);
    }
  };

  const handleMouseClick = () => {
    if (!_isEmpty(text.current.value)) {
      setTimeout(() => {
        stopTyping();
      }, 2000);
    }
  };

  return (
    <div className="message-input">
      {usersIsTyping.length > 0 && <p> {usersIsTyping.join(', ')} is Typing</p>}
      <InputBase
        inputComponent={TextField}
        className="inputField"
        label="Type your message here..."
        placeholder="Enter your message and press ENTER"
        inputRef={text}
        style={{ height: '30px', width: '80%' }}
        onChange={onChange}
        onBlur={handleMouseClick}
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
  usersIsTyping: PropTypes.array,
};

export default InputForm;
