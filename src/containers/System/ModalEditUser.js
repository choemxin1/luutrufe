import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalEditUser extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      // email:this.props.user.email,
      // password:this.props.user.password,
      // firstName:this.props.user.firstName,
      // lastName:this.props.user.lastName,
      // address:this.props.user.address,
      // phoneNumber:this.props.user.email,
      // gender:'',
      // roleId:''

      id: '',
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
    emitter.on('EVENT_MODAL_DATA', (user) => {
      this.setState(user);
      console.log('12333333333333333333', user)
    })
  }
  componentDidMount() {

    console.log('did muont', this.props.user)
  }
  toggle = () => {
    this.props.handleModalEditUser();
    // console.log('state',this.state)
    // console.log('props',this.props.user.firstName)
  }
  test = () => {
    this.props.handleModalEditUser();
    let check = this.checkValideInput();
    if (check) {
      this.props.handleEdit(this.state);
    }


  }
  handleOnChange = (e, id) => {
    this.setState({ [id]: e.target.value })
  }
  checkValideInput = () => {
    let check = true;
    let arrInput = ['firstName', 'lastName', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        check = false;
        alert('missing arr', arrInput[i]);
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

              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input type="password" class="form-control" name="password" placeholder="Password"
                value={this.state.password}
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">First Name</label>
              <input type="text" class="form-control" name="firstName"
                onChange={(e) => { this.handleOnChange(e, 'firstName') }}
                value={this.state.firstName} />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Last Name</label>
              <input type="text" class="form-control" name="lastName"
                onChange={(e) => { this.handleOnChange(e, 'lastName') }}
                value={this.state.lastName} />
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress">Address</label>
            <input type="text" class="form-control" name="address" id="inputAddress" placeholder="1234 Main St"
              onChange={(e) => { this.handleOnChange(e, 'address') }}
              value={this.state.address} />
            {/* onChange={(e) => this.handleOnChangeUsername(e)}/> */}
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">Phone  number</label>
              <input type="text" class="form-control" name="phoneNumber" id="inputCity"

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

          

        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={() => { this.test() }}>
            save change
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
