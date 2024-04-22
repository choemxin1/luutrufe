import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      gender: '',
      roleId: ''
    }
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        gender: '',
        roleId: ''
      });
      console.log('12333333333333333333')
    })
  }
  componentDidMount() {
  }
  toggle = () => {
    this.props.handleAddNewUser();
  }
  test = () => {
    this.props.handleAddNewUser();
    let check = this.checkValideInput();
    if (check) {
      this.props.createNewUser(this.state);
    }


  }
  handleOnChange = (e, id) => {
    this.setState({ [id]: e.target.value })
  }
  checkValideInput = () => {
    let check = true;
    let arrInput = ['email', 'password', 'firstName', 'lastName'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        check = false;
        alert('missing', arrInput[i]);
        break;
      }
    }
    return check;
  }
  render() {
    return (

      <Modal isOpen={this.props.isOpen}
        toggle={() => { this.toggle() }}
        size='lg'
      >
        <ModalHeader toggle={() => { this.toggle() }}>Modal title</ModalHeader>
        <ModalBody>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input type="email" class="form-control"
                value={this.state.email}
                onChange={(e) => { this.handleOnChange(e, 'email') }}
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input type="password" class="form-control" name="password" placeholder="Password"
                onChange={(e) => { this.handleOnChange(e, 'password') }}
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">First Name</label>
              <input type="text" class="form-control" name="firstName" value={this.state.firstName}
                onChange={(e) => { this.handleOnChange(e, 'firstName') }} />
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail4">First Name</label>
              <input type="text" class="form-control" name="firstName" value={this.state.firstName} id="previewImg"
                onChange={(e) => { this.handleOnChange(e, 'firstName') }} />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Last Name</label>
              <input type="text" class="form-control" name="lastName" htmlFor="previewImg"
                onChange={(e) => { this.handleOnChange(e, 'lastName') }} />
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress">Address</label>
            <input type="text" class="form-control" name="address" id="inputAddress" placeholder="1234 Main St"
              onChange={(e) => { this.handleOnChange(e, 'address') }} />
            {/* onChange={(e) => this.handleOnChangeUsername(e)}/> */}
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">Phone  number</label>
              <input type="text" class="form-control" name="phoneNumber" id="inputCity"
                onChange={(e) => { this.handleOnChange(e, 'phoneNumber') }}
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputState">Sex</label>
              <select id="inputState" name="gender" class="form-control">
                <option selected>Choose...</option>
                <option value="1">Female</option>
                <option value="0">Male</option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <label for="inputZip">Role</label>
              <select id="inputState" name="roleId" class="form-control">
                <option selected>Choose...</option>
                <option value="1">Admin</option>
                <option value="2">Doctor</option>
              </select>
            </div>
          </div>

          <button class="btn btn-primary"></button>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={() => { this.test() }}>
            CreateUser
          </Button>{' '}
          <Button color="secondary" onClick={() => { this.toggle() }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

    )
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
