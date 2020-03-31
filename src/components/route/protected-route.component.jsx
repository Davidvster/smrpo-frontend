import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {isAuthenticated} from "../../utils/authentication.util";

export default class ProtectedRoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: true
        };
    }

    componentDidMount() {
        isAuthenticated().then(result => {
            if (!result) {
                this.setState({authenticated: result});
            }
        })
    }

    render() {
        const {component: Component, ...props} = this.props;

        return (
            <Route
                {...props}
                render={props => {
                    return (
                        this.state.authenticated ?
                            <Component {...props} /> : <Redirect to="/login"/>
                    )
                } }
            />
        )
    }
}