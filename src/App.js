import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import React from 'react';
import { getAllUsers } from './appService';
import './home.css';
import { Loader } from './Loader/index';
import { ANTModal } from './Modal/index';
import { UserCard } from './UserCard';

export class App extends React.Component {
    state = {
        users: [],
        userSearch: '',
        isLoading: true,
        filteredUsers: null,
        editUserId: null,
    }

    async componentDidMount() {
        const userData = await getAllUsers();
        this.setState({
            isLoading: false,
            users: userData
        })
    }

    handleLikeClick = (id) => {
        const { users } = this.state;
        const updatedUsers = users.map((userData) => {
            if (userData.id === id) {
                userData.isLiked = !userData.isLiked;
            }
            return userData;
        })
        this.setState({
            users: updatedUsers
        })
    }

    handleUserDelete = (id) => {
        const { users } = this.state;
        const remainingUsers = users.filter((userData) => userData.id !== id);
        this.setState({ users: remainingUsers })
    }

    handleEdit = (id) => {
        this.setState({
            editUserId: id
        })
    }

    onModalClose = (upComingUserData) => {
        const { users } = this.state
        this.setState({
            editUserId: null
        })
        if (upComingUserData) {
            const updatedUsers = users.map((userData) => {
                if (userData.id === upComingUserData.id) {
                    return upComingUserData;
                }
                return userData;
            })
            this.setState({
                users: updatedUsers
            })
        }
    }

    handleSearch = (e) => {
        const value = e.target.value;
        const { users } = this.state;
        if (value.length > 0) {
            /*eslint-disable */
            const filteredUsers = users.filter((userInstance) => {
                if (((userInstance.name) || '').toLowerCase().indexOf(value.toLowerCase()) > -1) {
                    return userInstance;
                }
            })
            /*eslint-enable */
            this.setState({
                filteredUsers,
                userSearch: value
            })
            return;
        }
        this.setState({
            users,
            filteredUsers: null
        })
    }

    renderUserList = () => {
        const { users, filteredUsers, userSearch } = this.state
        if (filteredUsers && filteredUsers.length < 1) {
            return <div> No User Found with name {userSearch}</div>
        }
        return (filteredUsers || users || []).map((userInstance, index) =>
            <UserCard
                {...userInstance}
                onClickDelete={this.handleUserDelete}
                onLikeClick={this.handleLikeClick}
                onClickEdit={this.handleEdit}
                key={index}
            />)
    }

    render() {
        const { isLoading } = this.state;
        return <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
            {isLoading ? <Loader /> :
                < React.Fragment >
                    <ANTModal {...this.state} id={this.state.editUserId} onClose={this.onModalClose} />
                    <h4 className="header" >Guest User List</h4>
                    <div className="search-bar-container" >
                        <Input onChange={this.handleSearch} placeholder="Type name to search..." />
                    </div>
                    <Row className="user-card-container" >
                        {this.renderUserList()}
                    </Row>
                </React.Fragment >
            }
        </div>
    }
}

