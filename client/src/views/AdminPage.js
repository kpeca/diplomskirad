import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import options from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import Modal from 'react-bootstrap/Modal'



const UsersList = props => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.surname}</td>
    <td>{props.user.email}</td>
    <td>{props.user.password.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.user._id}>Izmeni</Link>     <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>Obriši</a>
  
  
          
    </td>
  </tr>
)

const RestaurantsList = props => (
  <tr>
    <td>{props.restaurant.name}</td>
    <td>{props.restaurant.address}</td>
    <td>{props.restaurant.phone}</td>
    <td>{props.restaurant.type}</td>
    <td>
      <Link to={"/edit/"+props.restaurant._id}>Izmeni</Link>     <a href="#" onClick={() => { props.deleteRestaurant(props.restaurant._id) }}>Obriši</a>
  
  
          
    </td>
  </tr>
)


export default class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this)
    this.deleteRestaurant = this.deleteRestaurant.bind(this)

    this.state = {users: [],
     restaurants: []};
  }

  componentDidMount() {
    axios.get('/allusers')
      .then(response => {
        this.setState({ users: response.data.users}
          )
          console.log(response.data.users)
      })
      .catch((error) => {
        console.log(error);
      })


      axios.get('/all')
      .then(response => {
        this.setState({ restaurants: response.data.restaurants}
          )
          console.log(response.data.restaurants)
      })
      .catch((error) => {
        console.log(error);
      })

  }
  
  deleteUser(id) {
    axios.delete('/user/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }
  deleteRestaurant(id) {
    axios.delete('/restaurant/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      restaurants: this.state.restaurants.filter(el => el._id !== id)
    })
  }

  UsersList() {
    console.log(this.state.users)
    return this.state.users.map(user => {
      return <UsersList user={user} deleteUser={this.deleteUser} key={user._id}/>;
    })
  }
  RestaurantsList() {
    console.log(this.state.restaurants)
    return this.state.restaurants.map(restaurant => {
      return <RestaurantsList restaurant={restaurant} deleteRestaurant={this.deleteRestaurant} key={restaurant._id}/>;
    })
  }

  render() {
    return (
      <div>
      <h2> Korisnici</h2>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Email</th>
              <th>Sifra</th>
              
            </tr>
          </thead>
          <tbody>
            { this.UsersList() }
          </tbody>
        </table>
      
        <div>
        <h2>Restorani</h2> 
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Naziv</th>
              <th>Adresa</th>
              <th>Telefon</th>
              <th>Tip</th>
              
            </tr>
          </thead>
          <tbody>
            { this.RestaurantsList() }
          </tbody>
        </table>

        </div>
       
      </div>
    )
  }
}
