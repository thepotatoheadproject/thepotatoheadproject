import React, { Component } from 'react';
import { connect } from 'react-redux';

import Main from '../Main/Main';
import Header from '../Header/Header';
import RequestList from '../RequestList/RequestList';
import Request from '../Request/Request';
import EmailFormModal from '../EmailFormModal/EmailFormModal';
import NotesModal from '../NotesModal/NotesModal';
import { handleGetAllRequests, handleToggle, setCurrentOpenedRequest } from '../../redux/actions/requestActions';
import { handleSendEmail } from '../../redux/actions/emailActions';
import { triggerLogout } from '../../redux/actions/loginActions';

class AdminPortal extends Component {

  state = {
    emailForm: {
      show: false,
      nominator: {}
    },
    notes: {
      show: false,
      notes: ''
    }
  }

  componentDidMount() {
    const { isAuthenticated, history, dispatch } = this.props;
    if (!isAuthenticated) {
      history.push('/login');
    }
    dispatch(handleGetAllRequests());
  }

  sendEmail = ({ note, tracking }) => {
    this.props.dispatch(handleSendEmail({
      note,
      tracking,
      nominatorEmail: this.state.emailForm.nominator.nominatorEmail,
      nominatorName: this.state.emailForm.nominator.nominatorName
    }));
    this.closeModal('emailForm');
  }

  showEmailForm = nominator => {
    this.setState({
      ...this.state,
      emailForm: {
        show: true,
        nominator
      }
    });
  }

  showNotes = notes => {
    this.setState({
      ...this.state,
      notes: {
        show: true,
        notes
      }
    });
  }

  handleToggleRequest = request => {
    this.props.dispatch(handleToggle(request));
  }

  openRequest = id => {
    // letting redux hold the openedRequest state so they don't close
    // on any re-renders
    this.props.dispatch(setCurrentOpenedRequest(id))
  }

  // renderRequest method passed down to RequestList to take care of building the list
  renderRequest = request => (
    <Request
      key={request._id}
      {...request}
      openRequest={this.openRequest.bind(this, request._id)}
      opened={request._id === this.props.opened}
      toggleMarkedSent={this.handleToggleRequest.bind(this, request)}
      showNotes={this.showNotes.bind(this, request.personalNote)}
      showEmailForm={this.showEmailForm.bind(this, {
        nominatorEmail: request.nominatorEmail,
        nominatorName: request.nominatorName
      })}
    />
  );

  closeModal(name) {
    this.setState({
      ...this.state,
      [name]: {
        ...this.state[name],
        show: false
      }
    });
  }

  handleLogout = () => {
    const { dispatch, history } = this.props;
    dispatch(triggerLogout());
    history.push('/login');
  }

  render() {
    return (
      <Main>
        <Header
          logout={this.handleLogout}
        />
        
        <RequestList
          columns={['Baby', 'Nominator', 'Parents', 'Hospital']}
          data={this.props.requests}
          renderRow={this.renderRequest}
        />

        <EmailFormModal
          onSend={this.sendEmail}
          visible={this.state.emailForm.show}
          nominator={this.state.emailForm.nominator}
          closeModal={this.closeModal.bind(this, 'emailForm')}
        />

        <NotesModal
        className='note'
          visible={this.state.notes.show}
          closeModal={this.closeModal.bind(this, 'notes')}
          note={this.state.notes.notes}
        />

      </Main>
    )
  }
}

const mapStateToProps = ({ requests, auth }) => ({
  // passing in what request is opened so opened requests stay open after re-render
  opened: requests.currentlyOpened,
  requests: requests.all,
  // since there's only one user, we simply just need to know if the admin is authenticated or not
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps)(AdminPortal);