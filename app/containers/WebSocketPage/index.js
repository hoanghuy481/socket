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
import { makeSelectUser, makeSelectUsersIsTyping } from './selectors';
import { actLogin, actUserTyping, actGetUserIsTyping } from './actions';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import LoginForm from './LoginForm';
import InputForm from './InputForm';

export function WebSocketPage(props) {
  useInjectReducer({ key: 'webSocketPage', reducer });
  useInjectSaga({ key: 'webSocketPage', saga });

  const SOCKET_URL = 'http://10.0.2.237:8080/ws-chat/';
  const { user, login, userTyping, getUsersIsTyping, usersIsTyping } = props;

  const onMessageReceived = users => {
    getUsersIsTyping(users);
  };

  return (
    <div>
      {!user.isLogin ? (
        <LoginForm onSubmit={login} />
      ) : (
        <>
          <SockJsClient
            url={SOCKET_URL}
            topics={['/topic/user_typing']} /* url room */
            debug={false}
            onConnect={console.log('Connected!!')}
            onDisconnect={console.log('Disconnected!')}
            onMessage={users => onMessageReceived(users)}
          />
          <InputForm
            user={user}
            userTyping={userTyping}
            usersIsTyping={usersIsTyping}
          />
        </>
      )}
    </div>
  );
}

WebSocketPage.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func,
  userTyping: PropTypes.func,
  getUsersIsTyping: PropTypes.func,
  usersIsTyping: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  usersIsTyping: makeSelectUsersIsTyping(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: username => {
      dispatch(actLogin(username));
    },
    userTyping: status => {
      dispatch(actUserTyping(status));
    },
    getUsersIsTyping: users => {
      dispatch(actGetUserIsTyping(users));
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
