import Axios from 'axios';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userSelected: '',
            title: '',
            content: '',
            date: new Date(),
        }
    }
    async componentDidMount() {
        const res = await Axios.get('http://localhost:4000/api/users');
        this.setState({ users: res.data });
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.title, this.state.content)
    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    onChangeDate = (date) => {
        this.setState({date})
    }
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a note</h4>
                    <div className="form-group">
                        <select onChange={this.onInputChange} className="form-control" name="userSelected" >
                            {
                                this.state.users.map(user => (
                                    <option key={user.username} value={user.username} >{user.username}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input onChange={this.onInputChange} type="text" className="form-control" placeholder="Title" name="title" required />
                    </div>
                    <div className="form-group">
                        <textarea onChange={this.onInputChange} name="content" className="form-control" placeholder="Content" required></textarea>
                    </div>
                    <div className="form-group">
                        <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate}>

                        </DatePicker>
                    </div>
                    <form onSubmit={this.onSubmit} >


                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateNote;
