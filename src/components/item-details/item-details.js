import React, { Component } from 'react';
import Spinner from "../spinner";
import './item-details.css';
import SwapiService from "../../services/swapi-service";

const Record = ({ item, field, label }) => {
    return(
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{ field }</span>
        </li>
    );
};

export { Record };

export default class ItemDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: null,
            image: null,
            loading: false
        };
    };

    componentDidMount() {
        this.updateItem();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.setState({
                loading: true,
            });
            this.updateItem();
        }

    }

    swapiService = new SwapiService();

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        };

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false,
                    image: getImageUrl(item)
                })
            });
    };

    render() {
        if (!this.state.item) {
            return <span>Select a person from a list</span>
        }

        const { image, loading } = this.state;
        const { id, name, gender, birthYear, eyeColor } = this.state.item;

        if (loading) {
            return <Spinner />;
        }

        return (
            <div className="person-details card">
                <img className="person-image"
                     src={image} />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {this.props.children}
                    </ul>
                </div>
            </div>
        );
    };
};