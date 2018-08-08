import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Container, Form, Modal, Input, Button, Dimmer, Loader, Header, Segment } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import Notification from 'containers/Notification';
import { makeSelectCurrentUser } from 'containers/App/redux/selectors';
import { makeSelectCurreuntUserName, makeSelectCurreuntUserEmail, makeSelectMeOpenModal, makeSelectMeLoading } from 'modules/app/user/redux/selectors';
import { closeModal, updateUserPasswordRequest } from 'modules/app/user/redux/actions';
import reducer from './redux/reducers';
import saga from './redux/saga';
import TopBar from './layout/components/TopBar';
import Dashboard from './dashboard';

import UsersPage from './user/pages/UsersPage';
import UserEditPage from './user/pages/UserEditPage';

import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: ''
    }
  }

  onClose = () => {
    this.props.closeModal(false);
  }

  onUpdateField = (evt) => {
    this.setState({newPassword: evt.target.value});
  }

  onSubmit = () => {
    const {userName, userEmail} = this.props;
    this.props.updateUserPassword(this.state.newPassword, userName, userEmail);
    this.onClick();
  }

  pagesRouter() {
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/users/:id" component={UserEditPage} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    );
  }

  currentUserRender(open, userName, userEmail, loading) {
    return (
      <Modal size="large" open={open} onClose={this.onClose} closeIcon>
        <Dimmer action={loading}>
          <Loader />
        </Dimmer>
        <Modal.Header>
          <Header as="h4" content="Your User Info"></Header>
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.onSubmit}>
            <Segment>
              <Form.Input label="User Name" required value={userName} />
              <Form.Input label="Email" required value={userEmail} />
              <Form.Input label="New Password" type="password" value={this.state.newPassword} onChange={this.onUpdateField}/>
            </Segment>
            <Button className="modal-cancel" onClick={this.onClose}> Cancel </Button>
            &nbsp; &nbsp;
            <Button className="modal-save" color="blue"> Save </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }

  render() {
    const { currentUser, userName, userEmail, open, loading } = this.props;
    return (
      <div className="main-app">
        <TopBar />
        <Notification />
        <Container className="app-container">
          {this.pagesRouter()}
          {userName.length > 0 && this.currentUserRender(open, userName, userEmail, loading)}
        </Container>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  userName: makeSelectCurreuntUserName(),
  userEmail: makeSelectCurreuntUserEmail(),
  open: makeSelectMeOpenModal(),
  loading: makeSelectMeLoading(),
});

const mapDispatchToProps = {
  closeModal,
  updateUserPassword: updateUserPasswordRequest,
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect,
)(App));
