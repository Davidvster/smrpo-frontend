import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import axios from "../utils/axios-instance.util";
import {isAuthenticated, handleLogin} from "../utils/authentication.util";

class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserUsername = this.onChangeUserUsername.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            authenticated: false,
            user_username: '',
            user_password: '',
            error_message: ''
        };
    }

    componentDidMount() {
        this.authenticate();
    }

    authenticate() {
        isAuthenticated().then(result => {
            if (result) {
                this.props.history.push('/');
            }
        })
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

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            error_message: ""
        });

        const credentials = {
            username: this.state.user_username,
            password: this.state.user_password
        };

        if (!credentials.username || !credentials.password) {
            this.setState({
                error_message: "Input    username and password"
            });

            return;
        }

        axios.post('/auth/login', credentials)
            .then(res => {
                handleLogin(res.data);
                this.props.history.push('/');
            })
            .catch(error => {
                    this.setState({
                        error_message: "Invalid username or password."
                    })
                }
            );
    }

    render() {
        return (
            <div className="container align-middle">
                <h3>Sign in</h3>
                <form className="row justify-content-center" onSubmit={this.onSubmit}>
                    <div className="col-sm-3">
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
                                value={this.state.user_password}
                                onChange={this.onChangeUserPassword}
                            />
                            {this.state.error_message &&
                            <p className="alert alert-danger">{this.state.error_message}</p>}
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Sign in" className="btn btn-primary"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);