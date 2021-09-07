import axios from 'axios';
import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import {Card,Button} from 'react-bootstrap';

class AllDataAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chocoData: []
        }
    }
    ///server.get('/getApi',getApi);
    componentDidMount = async() => {
        // let email=this.props.auth0.user.email;
        let urlApi = `${process.env.REACT_APP_SERVER}/getApi`;
        let Data = await axios.get(urlApi);
        console.log('Data.data:::::', Data.data);
        this.setState({
            chocoData: Data.data
        })
    }
// server.post('/addFav',addFav);
addToFav = async (item)=>{
let url = `${process.env.REACT_APP_SERVER}/addFav`;
let chocolateData = {
    title:item.title,
    imageUrl:item.imageUrl,
    email:this.props.auth0.user.email,
}
console.log('chocolateData:',chocolateData);
await axios.post(url,chocolateData);

}
  
    render() {
        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
                {
                    this.state.chocoData.map((item, key) => {
                        return (
                            <Card key={key} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Button onClick={()=>{this.addToFav(item)}} variant="primary">Add to favourit</Button>
                                </Card.Body>
                            </Card>
                        );
                    })
                }
            </div>
        )
    }
}

export default withAuth0(AllDataAPI);
