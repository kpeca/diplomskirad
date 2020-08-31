import React, {useContext} from 'react';
import 'materialize-css';
import {Link,useHistory} from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import {UserContext} from '../App'
import M from 'materialize-css'



export function Navbar() {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()

    const logOut = () => {
      localStorage.clear()
      dispatch({type:"CLEAR"})
      console.log("success")
      M.toast({html: "Successfully logged out", classes:"#43a047 green darken-1"})
      history.push('/')
}
    const renderList = () => {
      if(state){
        if(state.role ==='basic'){
          console.log("radi")
          return [ 
            <li><Link to="/myrestaurants">Moji restorani</Link></li>,
            <li><Link to="/addrestaurant">Dodaj restoran</Link></li>,
            <li>
              <button className="btn waves-effect waves-light" type="submit" name="action"
                onClick={()=> logOut()}>
                    Logout
                </button>
              </li>
            
        ]}
        if(state.role ==='admin') {
          return[
          <li><Link to="/addrestaurant">Dodaj restoran</Link></li>,
            <li><Link to="/admin">Admin Stranica</Link></li>,
            <li>
               <button className="btn waves-effect waves-light" type="submit" name="action"
                onClick={()=>logOut()}>
                    Logout
                </button>
            </li>
          ]
        } 
        } 
         
        if(!state) {
          return [
          <li><Link to="/signup">Registracija</Link></li>,
          <li><Link to="/signin">Login</Link></li>
          ]
        }
    } 
  
    


    return (
        
    <nav>
     <div className="nav-wrapper">
       <Link to="/" className="brand-logo left logo">Restaurants</Link>
        <ul id="nav-mobile" className="right">
        {renderList()}
        </ul>
    </div>
  </nav>
        
        
    )
}

export default Navbar
