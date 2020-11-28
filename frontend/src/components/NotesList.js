import React, { Component } from 'react';
import Axios from 'axios';
import {format} from 'timeago.js';

export class NotesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
        }
    }

    async componentDidMount() {
        this.getNotes();
    }

    getNotes = async () => {
        const res = await Axios.get('http://localhost:4000/api/notes');
        this.setState({
            notes: res.data,
        })
    }

    deleteNote = async (id) => {
        await Axios.delete(`http://localhost:4000/api/notes/${id}`);
        this.getNotes();
    }



    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4" key={note._id} >
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>
                                    <button onClick={() => this.deleteNote(note._id)} className="btn btn-danger">
                                        X
                                    </button>
                                </div>
                                <div className="card-body">
                                    <p>{note.content}</p>
                                    <p>Created by {note.author} {format(note.date)}</p>
                                    <p>Deathline: {note.date}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default NotesList;
