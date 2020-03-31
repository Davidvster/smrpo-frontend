import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {isAdmin, isAuthenticated, handleLogout, getUserName} from "../../utils/authentication.util";

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);

        this.state = {
            authenticated: false,
            isAdmin: isAdmin(),
            username: ''
        };

        this.props.history.listen((location, action) => {
            isAuthenticated().then(res => {
                if (this.state.authenticated !== res) {
                    this.setState({authenticated: res, isAdmin: isAdmin(), username: getUserName()});
                }
            });
        });
    }

    componentDidMount() {
        isAuthenticated().then(result => {
                if (result) {
                    this.setState({authenticated: result, isAdmin: isAdmin(), username: getUserName()});
                }
            }
        );
    }

    onLogout() {
        handleLogout();
        this.props.history.push('/login');
        this.setState({authenticated: false, isAdmin: false});
    }

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Agilimus</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {this.state.isAdmin && this.state.authenticated &&
                        <li className="navbar-item">
                            <Link to="/user/add" className="nav-link">Add user</Link>
                        </li>
                        }
                        {this.state.authenticated &&
                        <>
                            <li className="navbar-item">
                                <Link to="/sprint/add" className="nav-link">Add new sprint</Link>
                            </li>
                        </>
                        }
                    </ul>

                    {this.state.authenticated &&
                    <div className="float-right align-items-center">
                        <span className="mr-2 font-weight-bold">{this.state.username}</span>
                            <button onClick={this.onLogout} className="btn btn-danger">Logout</button>
                    </div>}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navigation);