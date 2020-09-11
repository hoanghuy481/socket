import React, { useRef } from 'react';
import { isEmpty as _isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

const InputForm = ({ user, userTyping, usersIsTyping }) => {
  const text = useRef('');
  const onChange = () => {
    if (!_isEmpty(text.current.value)) {
      if (user.status === 0) {
        userTyping(1);
      }
    } else {
      setTimeout(() => {
        userTyping(0);
      }, 2000);
    }
  };
  const handleMouseClickOut = () => {
    if (!_isEmpty(text.current.value)) {
      setTimeout(() => {
        userTyping(0);
      }, 2000);
    }
  };
  const handleMouseClickFocus = () => {
    if (!_isEmpty(text.current.value)) {
      userTyping(1);
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
        onBlur={handleMouseClickOut}
        onFocus={handleMouseClickFocus}
      />

      <Button variant="contained" color="primary">
        Send
      </Button>
    </div>
  );
};

InputForm.propTypes = {
  userTyping: PropTypes.func,
  usersIsTyping: PropTypes.array,
  user: PropTypes.object,
};

export default InputForm;
