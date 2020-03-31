import React, {Component} from 'react';
import axios from "../utils/axios-instance.util";

export default class UserAdd extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserUsername = this.onChangeUserUsername.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserSurname = this.onChangeUserSurname.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserRole = this.onChangeUserRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user_username: '',
            user_password: '',
            user_name: '',
            user_surname: '',
            user_email: '',
            user_role: 'user',
            error_message: '',
            response: false
        }
    }

    onChangeUserUsername(e) {
        this.setState({
            user_username: e.target.value
        });
    }

    onChangeUserPassword(e) {
        this.setState({
            user_password: e.target.value
        });
    }

    onChangeUserName(e) {
        this.setState({
            user_name: e.target.value
        });
    }

    onChangeUserSurname(e) {
        this.setState({
            user_surname: e.target.value
        });
    }

    onChangeUserEmail(e) {
        this.setState({
            user_email: e.target.value
        });
    }

    onChangeUserRole(e) {
        this.setState({
            user_role: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.user_username,
            password: this.state.user_password,
            name: this.state.user_name,
            surname: this.state.user_surname,
            email: this.state.user_email,
            role: this.state.user_role
        };

        axios.post('/user', newUser)
            .then(res => {
                this.setState({
                    user_username: '',
                    user_password: '',
                    user_name: '',
                    user_surname: '',
                    user_email: '',
                    user_role: 'user',
                    error_message: '',
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
            <div className="container align-middle">
                <div className="col-8">
                    <h3>Add a new user</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.user_username}
                                   onChange={this.onChangeUserUsername}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input
                                type="password"
                                className="form-control"
                                minLength={8}
                                value={this.state.user_password}
                                onChange={this.onChangeUserPassword}
                            />
                            <p>Password must contain minimum 8 characters, at least one uppercase letter, one lowercase letter and one number.</p>
                        </div>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.user_name}
                                   onChange={this.onChangeUserName}
                            />
                        </div>
                        <div className="form-group">
                            <label>Surname: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.user_surname}
                                inputMode={"email"}
                                onChange={this.onChangeUserSurname}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input
                                type="email"
                                className="form-control"
                                value={this.state.user_email}
                                onChange={this.onChangeUserEmail}
                            />
                        </div>

                        <div className="form-group">
                            <label>Role: </label><br/>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input"
                                       type="radio"
                                       name="roleAdmin"
                                       id="roleAdmin"
                                       value="admin"
                                       checked={this.state.user_role === 'admin'}
                                       onChange={this.onChangeUserRole}
                                />
                                <label className="form-check-label">Admin</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input"
                                       type="radio"
                                       name="roleUser"
                                       id="roleUser"
                                       value="user"
                                       checked={this.state.user_role === 'user'}
                                       onChange={this.onChangeUserRole}
                                />
                                <label className="form-check-label">User</label>
                            </div>
                        </div>

                        {this.state.response &&
                        <div className="alert alert-success" role="alert">
                            <br/>
                            User successfully added!
                        </div>
                        }
                        {this.state.error_message &&
                        <div className="alert alert-danger" role="alert">
                            <br/>
                            {this.state.error_message}
                        </div>
                        }

                        <div className="form-group">
                            <input type="submit" value="Add user" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}