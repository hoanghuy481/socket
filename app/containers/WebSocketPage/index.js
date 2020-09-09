/**
 *
 * WebSocketPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SockJsClient from 'react-stomp';

// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectUser } from './selectors';
import { actLogin, actIsTyping, actStopTyping } from './actions';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import LoginForm from './LoginForm';
import InputForm from './InputForm';
export function WebSocketPage(props) {
  const SOCKET_URL = 'http://10.0.2.237:8080/ws-chat/';
  const { user, login } = props;
  useInjectReducer({ key: 'webSocketPage', reducer });
  useInjectSaga({ key: 'webSocketPage', saga });

  const handleSubmit = username => {
    login(username);
  };
  const onMessageReceived = msg => {
    console.log('New Message Received!!', msg);
  };

  return (
    <div>
      {!user.isLogin ? (
        <LoginForm onSubmit={handleSubmit} />
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
          <InputForm />
        </>
      )}
    </div>
  );
}

WebSocketPage.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: username => {
      dispatch(actLogin(username));
    },
    isTyping: status => {
      dispatch(actIsTyping(status));
    },
    stopTyping: status => {
      dispatch(actStopTyping(status));
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
