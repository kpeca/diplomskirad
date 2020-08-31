import React, {useState,useContext}   from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

export const Signin = () => {
    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Postdata = () => {
        fetch("/signin", {
            method:"post",
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application-json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER", payload: data.user})
                M.toast({html: "Successfully signed in", classes:"#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err=> {
            console.log(err)
        })
    }
    return (
        <div className="container">
            <div className="card-signin input-field">
                <h2>Log In</h2>
                <input
                type="text"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                
                />
                <input
                type="text"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light" type="submit" name="action"
                onClick={()=> Postdata()}>
                    Login
                </button>
                <Link to="/signup">
                <h5>Don't have an account?</h5>
                </Link>
            </div>
            </div>    
        
       
    )
}
export default Signin