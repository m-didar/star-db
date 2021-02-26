import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from "../error-indicator";
import ItemDetails, { Record } from "../item-details";
import Row from "../row";
import SwapiService from "../../services/swapi-service";
import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
        };
    };

    swapiService = new SwapiService();

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        })
    }

    render() {
        if(this.state.hasError) return <ErrorIndicator />;

        const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.swapiService;

        const personDetails = (
            <ItemDetails itemId={11}
                         getData={getPerson}
                         getImageUrl={getPersonImage}>
                <Record field="gender" label={"Gender"} />
                <Record field="eyeColor" label={"Eye Color"} />
            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails itemId={5}
                         getData={getStarship}
                         getImageUrl={getStarshipImage} />
        )

        return (
            <div>
                <Header />
                <RandomPlanet />
                {/*<PeoplePage />*/}

                <Row left={personDetails}
                     right={starshipDetails} />

                {/*<div className="row mb2 people-page">*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemList*/}
                {/*            onItemSelected={this.onPersonSelected}*/}
                {/*            getData={this.swapiService.getAllPlanets}*/}
                {/*            renderItem={({ name, diameter }) => `${name} (${diameter})`} />*/}
                {/*    </div>*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemDetails personId={this.state.selectedPerson} />*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="row mb2 people-page">*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemList*/}
                {/*            onItemSelected={this.onPersonSelected}*/}
                {/*            getData={this.swapiService.getAllStarships}*/}
                {/*            renderItem={({ name, model }) => (<span>{name} ({model})</span>)} />*/}
                {/*    </div>*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemDetails personId={this.state.selectedPerson} />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        );
    }

};