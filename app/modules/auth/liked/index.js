import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Table, Header, Container, Dimmer, Loader, Button, Confirm, Icon } from 'semantic-ui-react';
import Pagination from 'components/Pagination';
import { userListRequest } from '../redux/actions';
import { makeSelectUserList, makeSelectUserListLoading } from '../redux/selectors';

class MostLikedPage extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      deleteId: null,
      showDeleteConfirm: false,
      page: 1,
      pageSize: 10,
    };
  }

  componentWillMount() {
    this.props.userList();
  }

  onChangePage = (page) => {
    this.setState({ page });
  }

  renderUsers = () => {
    const { users, loading } = this.props;
    const { page, pageSize } = this.state;
    if (!users.size) {
      return (
        <Table.Row>
          <Table.Cell colSpan="4">
            No Users
          </Table.Cell>
        </Table.Row>
      );
    }

    return users.slice((page - 1) * pageSize, page * pageSize).map((user) => (
      <Table.Row key={user.get('_id')}>
        <Table.Cell>
          <Link to={`/users/${user.get('_id')}`}>
            {user.get('userName')}
          </Link>
        </Table.Cell>
        <Table.Cell>
          {user.get('email')}
        </Table.Cell>
        <Table.Cell>
          {user.get('likers').size}
        </Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    const { page, pageSize } = this.state;
    const { loading, users } = this.props;
    return (
      <Container>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Header as="h2" style={{marginTop: 60}} content="Users" />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Number Of Likes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderUsers()}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Pagination
                  total={users.size}
                  currentPage={page}
                  onChange={this.onChangePage}
                  perPage={pageSize}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  users: makeSelectUserList(),
  loading: makeSelectUserListLoading(),
});
const mapDispatchToProps = {
  userList: userListRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MostLikedPage);
