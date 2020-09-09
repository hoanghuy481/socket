/**
 *
 * WebSocketPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SockJsClient from 'react-stomp';

// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectUser } from './selectors';
import { actLogin, actIsTyping, actStopTyping, actUserTyping } from './actions';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import LoginForm from './LoginForm';
import InputForm from './InputForm';
export function WebSocketPage(props) {
  const SOCKET_URL = 'http://10.0.2.237:8080/ws-chat/';
  const { user, login, isTyping, stopTyping, UserTyping } = props;
  useInjectReducer({ key: 'webSocketPage', reducer });
  useInjectSaga({ key: 'webSocketPage', saga });
  useEffect(() => {
    const userTyping = {
      name: user.username,
      status: user.status,
    };
    if (user.status > 0) {
      UserTyping(userTyping);
    } else if (user.status === 0) {
      UserTyping(userTyping);
    }
  }, [user.status]);
  const onMessageReceived = msg => {
    console.log('New Message Received!!', msg);
  };

  return (
    <div>
      {!user.isLogin ? (
        <LoginForm onSubmit={login} />
      ) : (
        <>
          <SockJsClient
            url={SOCKET_URL}
            topics={['/topic/user_typing']}
            onConnect={console.log('Connected!!')}
            onDisconnect={console.log('Disconnected!')}
            debug={false}
            onMessage={msg => onMessageReceived(msg)}
          />
          <InputForm isTyping={isTyping} stopTyping={stopTyping} />
        </>
      )}
    </div>
  );
}

WebSocketPage.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func,
  isTyping: PropTypes.func,
  stopTyping: PropTypes.func,
  UserTyping: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: username => {
      dispatch(actLogin(username));
    },
    isTyping: () => {
      dispatch(actIsTyping());
    },
    stopTyping: () => {
      dispatch(actStopTyping());
    },
    UserTyping: user => {
      dispatch(actUserTyping(user));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WebSocketPage);
