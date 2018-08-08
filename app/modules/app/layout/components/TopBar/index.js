import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Container } from 'semantic-ui-react';
import { makeSelectCurrentUser } from 'containers/App/redux/selectors';
import { logout } from 'modules/auth/redux/actions';
import { getMe } from 'modules/app/user/redux/actions';

import './style.scss';

class TopBar extends Component {
  render() {
    const { currentUser, logout: logoutAction, getMe: meAction } = this.props;
    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as={Link} header to="/">
            Poviolab Test
          </Menu.Item>
          <Dropdown item simple text="Users">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/users">User List</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position="right">
            <Dropdown item simple text={`${currentUser.get('userName')}`}>
              <Dropdown.Menu>
                  <Dropdown.Item onClick={meAction}> Me </Dropdown.Item>
                <Dropdown.Item onClick={logoutAction}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  logout,
  getMe,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TopBar);
