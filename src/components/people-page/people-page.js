import React, { Component } from "react";
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import Row from "../row";
import ErrorBoundary from "../error-boundary";
import SwapiService from "../../services/swapi-service";
import './people-page.css';

export default class PeoplePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPerson: 1,
            hasError: false,
        };
    };

    swapiService = new SwapiService();

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    render() {
        if(this.state.hasError) return <ErrorIndicator />;

        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected}
                      getData={this.swapiService.getAllPeople}>
                {(item) => `${item.name} (${item.birthYear})`}
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundary>
                <ItemDetails personId={this.state.selectedPerson} />
            </ErrorBoundary>
        );

        return(
            <Row left={itemList} right={personDetails} />
        );
    };
};