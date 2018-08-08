import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Header, Segment, Container, Form, Button, Dimmer, Loader, Dropdown } from 'semantic-ui-react';
import { makeSelectCurrentUser } from 'containers/App/redux/selectors';
import {
  userLoadRequest,
  updateUserField,
  userSaveRequest,
  loadNewUser,
} from '../redux/actions';
import { makeSelectUser, makeSelectUserLoading } from '../redux/selectors';

class UserPage extends Component {
  componentWillMount() {
    this.loadUser(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.loadUser(nextProps.match.params.id);
    }
  }

  onSubmit = () => {
    this.props.userSave();
  }

  onUpdateField = (field) => (evt) => {
    this.props.updateField(field, evt.target.value);
  }

  onUpdateDropdown = (field) => (evt, data) => {
    this.props.updateField(field, data.value);
  }

  loadUser = (id) => {
    const { userLoad } = this.props;
    if (id === 'new') {
      this.props.loadNewUser();
    } else {
      userLoad(id);
    }
  }

  render() {
    const { currentUser, user, loading } = this.props;
    let likeCount = 0;
    if (user.size > 0) {
      likeCount = user.get('likers').size;
    }
    return (
      <Container fluid>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Header as="h2" content='Edit User'/>
        <Form onSubmit={this.onSubmit}>
          <Segment>
            <Header as="h4" content="Basic Info" dividing />
            <Form.Input label="User Name" required value={user.get('userName') || ''} />
            <Form.Input label="Email" type="email" required value={user.get('email') || ''} />
            <label>Number of Likes: </label> &nbsp; &nbsp;
            {likeCount}
          </Segment>
          <Link to="/users" style={{float: 'right'}}>Done</Link>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectUserLoading(),
});

const mapDispatchToProps = {
  userLoad: userLoadRequest,
  updateField: updateUserField,
  userSave: userSaveRequest,
  loadNewUser,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserPage);
