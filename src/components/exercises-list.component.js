import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/styles.css"

const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
)

export default class ExercisesList extends Component {
    GET_ALL_EXERCISES = 'http://localhost:5000/exercises/'
    DELETE_EXERCISE = 'http://localhost:5000/exercises/'

    constructor(props) {
        super(props)

        this.deleteExercise = this.deleteExercise.bind(this)

        this.state = {
            exercises: []
        }
    }

    componentDidMount() {
        axios.get(this.GET_ALL_EXERCISES)
        .then(res => {
            this.setState({
                exercises: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    deleteExercise(id) {
        axios.delete(this.DELETE_EXERCISE + id)
        .then(res => console.log(res.data));
        
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(curExer => {
            return <Exercise exercise={curExer} deleteExercise={this.deleteExercise} key={curExer._id} />
        })
    }

    render() {
        return (
            <div className="page-spacing">
                <h3>Logged Exercises</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.exerciseList() }
                </tbody>
                </table>
            </div>
        )
    }
}