import React, { Component } from 'react';
import Axios from 'axios';

export class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            username: '',
        }
    }

    componentDidMount() {
        this.getUsers();
        console.log(this.state.users);
    }

    getUsers = async () => {
        const res =  await Axios.get('http://localhost:4000/api/users');
        this.setState({users: res.data});
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const res = await Axios.post('http://localhost:4000/api/users', {
            username: this.state.username,
        });
        this.getUsers();
        this.setState({username: ''});
    }

    deleteUser = async (id) => {
        await Axios.delete(`http://localhost:4000/api/users/${id}`);
        this.getUsers();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <h3>Create New User</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li 
                                className="list-group-item list-group-item-active" 
                                key={user._id}
                                onDoubleClick={() => this.deleteUser(user._id)}
                                >
                                    {user.username}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default CreateUser
