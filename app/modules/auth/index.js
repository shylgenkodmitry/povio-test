import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Menu, Dropdown, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Notification from 'containers/Notification';
import LoginPage from './login';
import SignupPage from './signup';
import MostLikedPage from './liked';
import './style.scss';

class Auth extends Component {
  render() {
    return (
      <div className="auth-app">
        <Notification className="auth-notification" />
        <Menu fixed="top" inverted>
          <Container>
            <Dropdown item simple text="Users">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/most-liked">Most Liked Users</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Menu position="right">
              <Dropdown item simple text="login">
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/signup">Register</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Container>
        </Menu>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/most-liked" component={MostLikedPage} />
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Auth);
