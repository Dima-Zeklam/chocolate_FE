import axios from 'axios';
import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
// import {Card,Button} from 'react-bootstrap';
import ChocoCard from './ChocoCard';

class AllDataAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chocoData: []
        }
    }
    ///server.get('/getApi',getApi);
    componentDidMount = async () => {
        // let email=this.props.auth0.user.email;
        let urlApi = `${process.env.REACT_APP_SERVER}/getApi`;
        let Data = await axios.get(urlApi);
        console.log('Data.data:::::', Data.data);
        this.setState({
            chocoData: Data.data
        })
    }
    // server.post('/addFav',addFav);
    addToFav = async (item) => {
        let url = `${process.env.REACT_APP_SERVER}/addFav`;
        let chocolateData = {
            title: item.title,
            imageUrl: item.imageUrl,
            email: this.props.auth0.user.email,
        }
        console.log('chocolateData:', chocolateData);
        await axios.post(url, chocolateData);

    }

    render() {
        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
                <ChocoCard
                    chocoData={this.state.chocoData}
                    addToFav={this.addToFav}

                />
            </div>
        )
    }
}

export default withAuth0(AllDataAPI);
