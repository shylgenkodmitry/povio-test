import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { signupRequest } from '../redux/actions';

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      userName: '',
      password: '',
    };
  }

  onChange = (field) => (evt) => {
    this.setState({ [field]: evt.target.value });
  }

  onSubmit = () => {
    const { email, userName, password } = this.state;
    this.props.signupRequest({ email, userName, password });
  }

  render() {
    const { email, userName, password } = this.state;
    return (
      <Grid
        textAlign="center"
        className="page-login"
        verticalAlign="middle"
      >
        <Grid.Column className="column-login" onSubmit={this.onSubmit}>
          <Header as="h2" color="blue" textAlign="center">
            Sign up a new account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                value={userName}
                onChange={this.onChange('userName')}
                placeholder="User Name"
              />
              <Form.Input
                fluid
                type="email"
                value={email}
                onChange={this.onChange('email')}
                placeholder="E-mail address"
              />
              <Form.Input
                fluid
                value={password}
                onChange={this.onChange('password')}
                placeholder="Password"
                type="password"
              />
              <Button primary fluid size="large">Sign up</Button>
              <Link to="/login" className="signup-link">Go back to log in</Link>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
  signupRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SignupPage);
