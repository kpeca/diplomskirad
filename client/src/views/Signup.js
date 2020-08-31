import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'


export const Signup = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Postdata = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email",classes:"#c62828 red darken-3" })
            return
        }
        fetch("/signup", {
            method:"post",
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application-json"
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
                history.push('/signin')
            }
        })
    }
    return (
        <div className="container">
            <div className="card-signin input-field">
                <h2>Sign Up</h2>
                <input
                type="text"
                placeholder="name"
                value={name}
                onChange={e => setName(e.target.value)}
                />
                <input
                type="text"
                placeholder="surname"
                value={surname}
                onChange={e => setSurname(e.target.value)}
                />
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
                    Sign Up
                </button>
                <Link to="/signin">
                    <h5>Already have an account?</h5>
                </Link>
            </div>
        </div>
       
    )
}
export default Signup