import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import ModelForm from './ModelForm.js';

class MyFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FavData: [],
      selscted: {},
      show: false
    }
  }
  componentDidMount = () => {
    this.getFav();
  }
  // server.get('/getFav',getFav);
  getFav = async () => {
    let email = this.props.auth0.user.email;
    let URl = `${process.env.REACT_APP_SERVER}/getFav?email=${email}`;
    let favoriteData = await axios.get(URl);
    this.setState({
      FavData: favoriteData.data
    })
    console.log('favData::::', this.state.FavData);
  }
  // server.delete('/deleteFav/:ID',deleteFav)
  deleteFav = async (ID) => {
    console.log(ID);
    let url = `${process.env.REACT_APP_SERVER}/deleteFav/${ID}`;
    let DeletedData = await axios.delete(url);
    console.log('DeletedData.data', DeletedData.data);
    await this.setState({
      FavData: DeletedData.data
    })
    this.getFav();
  }
  setlectesItem = async (ID) => {
    let selsctItem = this.state.FavData.find(item => {
      return (item._id === ID);
    })
    this.setState({
      selscted: selsctItem,
      show: true
    })
  }
  // server.put('/updateFav/:ID',updateFav);
  updateFav = async (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_SERVER}/updateFav/${this.state.selscted._id}`;
    let UpdateItem = {
      title: e.target.title.value,
      imageUrl: e.target.imageUrl.value
    }
    let updatedData = await axios.put(url, UpdateItem);
    this.setState({
      FavData: UpdateItem,
      show: false
    })
    this.getFav();
  }
  closeHundler = () => {
    this.setState({
      show: false
    })
  }
  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        {this.state.FavData.length && 
          this.state.FavData.map((item, key) => {
            return (
              <Card key={key} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Button onClick={() => { this.deleteFav(item._id) }} variant="primary">delete</Button>
                  <Button onClick={() => { this.setlectesItem(item._id) }} variant="primary">update</Button>
                </Card.Body>
              </Card>
            );
          })
        }
        {
          !this.state.FavData.length && <p style={{ backgroundColor: 'yellow' ,textAlign:'center'}} > Your List is Empty ¯_(ツ)_/¯</p>
        }
        
        
        <ModelForm 
        show={this.state.show}
        closeHundler={this.closeHundler}
        updateFav={this.updateFav}
        selscted={this.state.selscted}
        />
      </>
    )
  }
}

export default withAuth0(MyFavorites);

