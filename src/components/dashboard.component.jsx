import React, {Component} from 'react';
import {isAdmin} from "../utils/authentication.util";
import {withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

// Defines the number of cards that appear in a single card deck (dashboard row).
const deckSize = 4;

export default class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: isAdmin(),
            projects: []
        }
    }

    componentDidMount() {
        // TODO Implement real project loading here.
        const placeholderProjects = [
            {id: 1, title: "Cool project 1", productOwner: 'Brane', scrumMaster: 'Stane'},
            {id: 2, title: "Cool project 2", productOwner: 'Brane', scrumMaster: 'Stane'},
            {id: 3, title: "Cool project 3", productOwner: 'Brane', scrumMaster: 'Stane'},
            {id: 4, title: "Cool project 4", productOwner: 'Brane', scrumMaster: 'Stane'},
            {id: 5, title: "Cool project 5", productOwner: 'Brane', scrumMaster: 'Stane'},
        ];

        this.setState({projects: placeholderProjects});
    }


    render() {
        const decks = [];

        // Split projects into chunks. Size depends on "rowSize". This determines number of cards per deck.
        for (let index = 0; index < this.state.projects.length; index += deckSize) {
            const projects = this.state.projects.slice(index, index + deckSize);
            const createAddItem = this.state.isAdmin && projects.length < deckSize;

            decks.push(<CardDeck key={index} projects={projects} addItem={createAddItem}/>);
        }

        if (this.state.projects.length % deckSize === 0) {
            decks.push(<CardDeck key={decks.length} projects={[]} addItem/>);
        }

        return (
            <div className="container mt-4">
                {decks}
            </div>
        );
    }
}

function CardDeck(props) {
    let index = 0;
    let cards = props.projects.map(project => <Card key={index++} project={project}/>);

    // Create card that redirect to project add page.
    if (props.addItem) {
        cards.push(<Card key={index++} addItem/>);
    }

    // Fill the row with empty cards, so the existing cards don't stretch.
    while (cards.length < deckSize) {
        cards.push(<Card key={index++} project={{}} emptyCard/>);
    }

    return <div className="card-deck text-center mt-4">
        {cards}
    </div>;
}

const Card = withRouter((props) => {
    const history = props.history;

    function redirectToProject(identifier) {
        // TODO Redirect to project page
        // history.push("/projects/add");
        console.log(identifier);
    }

    function redirectToAdd(event) {
        event.preventDefault();

        // TODO Redirect to project add page
        // history.push("/projects/" + projectId);
        console.log("Add");
    }

    let classNames="card shadow";

    // Create card for admin to go to project creation page.
    if (props.addItem) {
        return <div className={classNames} onClick={event => redirectToAdd(event)}>
            <div className="card-header">
                New project
            </div>
            <div className="card-body">
                {/*a is used for styling only. The href doesn't do anything.*/}
                <a href="/">
                    <FontAwesomeIcon size={"5x"} className="h-100" icon={faPlusCircle}/>
                </a>
            </div>
        </div>
    }

    // Empty cards must remain hidden from user.
    if (props.emptyCard) {
        classNames += " invisible";
    }

    const project = props.project;
    return (
        <div className={classNames}>
            <div className="card-header">
                {project.title}
            </div>
            <div className="card-body">
                <p className="card-text">Product owner: {project.productOwner}</p>
                <p className="card-text">Scrum master: {project.scrumMaster}</p>
                <button className="btn btn-primary" onClick={() => redirectToProject(project.title)}>Visit</button>
            </div>
        </div>
    );
});