import React,{useEffect, createContext, useReducer, useContext,useState}from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Signin from './views/Signin';
import Signup from './views/Signup';
import AddRestaurant from './views/AddRestaurant'
import AdminPage from './views/AdminPage'
import MyRestaurants from './views/MyRestaurants'
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { TypeSearch } from './components/TypeSearch';
import {reducer, initialState} from '../src/reducer/userReducer'


export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext)
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"))
  if(user){
    dispatch({type: "USER", payload: user})
    history.push('/')
  } else {
    history.push('/')
  }
},[])

  return (
    <Switch>
      <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/signin">
          <Signin/>
        </Route>
        <Route  path="/signup">
          <Signup/>
        </Route>
        <Route path="/myrestaurants">
          <MyRestaurants/>
        </Route> 
        <Route path="/addrestaurant">
          <AddRestaurant/>
        </Route>       
        <Route path="/admin">
          <AdminPage/>
        </Route> 
     </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  const [selectedOption, setSelectedOption] = useState()
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
        <Navbar/>
        <TypeSearch/>
        <Routing/>
  </BrowserRouter>
    </UserContext.Provider>

    
  );
}
export default App;
