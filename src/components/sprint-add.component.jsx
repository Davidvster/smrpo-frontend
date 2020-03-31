import React, {Component} from 'react';
import axios from "../utils/axios-instance.util";

export default class SprintAdd extends Component {
    constructor(props) {
        super(props);

        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeSpeed = this.onChangeSpeed.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            project_id: 'TODO',
            start_date: null,
            end_date: null,
            speed: 1,
            error_message: '',
            response: false
        };
    }

    onChangeStartDate(e) {
        this.setState({
            start_date: e.target.value,
            error_message: ''
        });
    }

    onChangeEndDate(e) {
        this.setState({
            end_date: e.target.value,
            error_message: ''
        });
    }

    onChangeSpeed(e) {
        this.setState({
            speed: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.state.start_date || !this.state.end_date) {
            this.setState({
                error_message: 'Please select the sprint start and end dates.'
            });
            return
        }

        const newSprint = {
            project_id: this.state.project_id,
            startDate: this.state.start_date,
            end_date: this.state.end_date,
            speed: this.state.speed
        };

        axios.post('/sprint', newSprint)
            .then(res => {
                this.setState({
                    start_date: null,
                    end_date: null,
                    speed: 1,
                    response: true
                })
            })
            .catch(error => {
                    var message = "An unknown error occurred.";
                    if (error.response.data.message) {
                        message = error.response.data.message
                    }
                    this.setState({
                        error_message: message,
                        response: false
                    })
                }
            );
    }

    render() {
        return (
            <div className="container">
                <div className="col-8">
                    <h3>Create a new sprint</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Sprint start: </label>
                            <input type="date"
                                   className="form-control"
                                   value={this.state.start_date}
                                   onChange={this.onChangeStartDate}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sprint end: </label>
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.end_date}
                                onChange={this.onChangeEndDate}
                            />
                        </div>
                        <div className="form-group">
                            <label>Speed: </label>
                            <input type="number"
                                   min={1}
                                   className="form-control"
                                   value={this.state.speed}
                                   onChange={this.onChangeSpeed}
                            />
                        </div>

                        {this.state.response &&
                        <div className="alert alert-success" role="alert">
                            <br/>
                            Sprint successfully created!
                        </div>
                        }
                        {this.state.error_message &&
                        <div className="alert alert-danger" role="alert">
                            <br/>
                            {this.state.error_message}
                        </div>
                        }

                        <div className="form-group">
                            <input type="submit" value="Create sprint" className="btn btn-success"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}