import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {isAdmin, isAuthenticated} from "../../utils/authentication.util";

export default class AdminProtectedRoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: true,
            isAdmin: isAdmin()
        };
    }

    componentDidMount() {
        isAuthenticated().then(result => {
            if (!result) {
                this.setState({
                    authenticated: result,
                });
            }
        });
    }

    render() {
        const {component: Component, ...props} = this.props;

        return (
            <Route
                {...props}
                render={props => {
                    if (this.state.authenticated && this.state.isAdmin) {
                        return (<Component {...props} />)
                    } else if (this.state.authenticated) {
                        return (<Redirect to="/"/>)
                    } else {
                        return (<Redirect to="/login"/>)
                    }
                }}
            />
        )
    }
}