import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserApi, deleteUserApi, editUserApi,getDetailInfoDoctorByIdApi } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            user: {}
        }
    }

    async componentDidMount() {
        let res = await getAllUsers('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrUsers: res.users
            })
        }



    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })

    }
    handleModalEditUser = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit
        })

    }
    createNewUser = async (data) => {
        try {
            let resApi = await createNewUserApi(data);
            if (resApi.errCode === 0) {
                let res = await getAllUsers('ALL');
                if (res && res.errCode === 0) {
                    this.setState({
                        arrUsers: res.users
                    })
                }
            }
            // emitter.emit('clear-data-modal')
            // emitter.emit('EVENT_CLEAR_MODAL_DATA',{'id':'your id'})
            emitter.emit('EVENT_CLEAR_MODAL_DATA')
        } catch (e) {
            console.log('qwe', e)
        }
    }
    handleDeleteUser = async (userId) => {
        try {
            let resApi = await deleteUserApi(userId);
            console.log(resApi);
            if (resApi.errCode === 0) {
                let res = await getAllUsers('ALL');
                if (res && res.errCode === 0) {
                    this.setState({
                        arrUsers: res.users
                    })
                }
            }
        } catch (e) {
            console.log('qwe', e)
        }
    }
    handlegetDoctor = async (id) => {
        try {
            let resApi = await getDetailInfoDoctorByIdApi(id);
            console.log('get info detail doctor',resApi);
        }catch (e) {
            console.log('qwe', e)
        }
    }
    handleEdit = async (user) => {
        try {
            let resApi = await editUserApi(user);
            console.log('testttttttttttt')
            console.log(resApi);
            if (resApi.errCode === 0) {
                let res = await getAllUsers('ALL');
                if (res && res.errCode === 0) {
                    this.setState({
                        arrUsers: res.users
                    })
                }
            }
        } catch (e) {
            console.log('qwe', e)
        }
    }
    handleEditUser = async (user) => {

        this.handleModalEditUser();

        emitter.emit('EVENT_MODAL_DATA', user)
    }
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <>

                <ModalUser
                    isOpen={this.state.isOpenModal}
                    handleAddNewUser={this.handleAddNewUser}
                    createNewUser={this.createNewUser} />
                <ModalEditUser
                    isOpen={this.state.isOpenModalEdit}
                    handleModalEditUser={this.handleModalEditUser}
                    handleEdit={this.handleEdit}

                />
                <div className="title text-center">Manage users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}>
                        <i className='fas fa-plus'></i>AddNewUser
                    </button>
                </div>
                <div className='mt-3 mx-1'>

                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Id</th>
                            <th>Action</th>
                        </tr>

                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.id}</td>
                                    <td>
                                        <button class="btn-edit"
                                            onClick={() => this.handleEditUser(item)}
                                        >Edit</button>
                                        <button class="btn-edit"
                                            onClick={() => this.handleDeleteUser(item.id)}
                                        >Delete</button>
                                        <button class="btn-edit"
                                            onClick={() => this.handlegetDoctor(item.id)}
                                        >get</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </>


        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
