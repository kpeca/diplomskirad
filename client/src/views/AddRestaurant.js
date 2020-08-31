import React, {useState,useEffect} from 'react'
import M from 'materialize-css'
import options from 'materialize-css'
import {useHistory} from 'react-router-dom';
 

export const AddRestaurant = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [url,setUrl] = useState("");
// const [type, setType] = useState("");
 
  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, options);
    });
    if(url){
    fetch("/addrestaurant", {
      method:"post",
      headers:{
          "Content-Type" : "application/json",
          "Authorization" : "Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
          name,
          address,
          phone,
          type,
          pic:url
      })
  }).then(res=>res.text())
  .then(data=>{
      console.log(data)
      if(data.error){
          M.toast({html: data.error,classes:"#c62828 red darken-3"})
         // history.push('/signin')
      }
      else{
         // localStorage.setItem("jwt",data.token)
        //  localStorage.setItem("user",JSON.stringify(data.user))
          M.toast({html: "Restaurant succesfully created", classes:"#43a047 green darken-1"})
          history.push('/')
      }
  }).catch(err=> {
      console.log(err)
  })
    }
  }, [url])

  const postDetails = ()=> {
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","restaurants-image")
    data.append("cloud_name","dn38z22n6")
    fetch("	https://api.cloudinary.com/v1_1/dn38z22n6/image/upload",{
      method: "post",
      body: data
    })
    .then(res=>res.json())
    .then(data=>{
      setUrl(data.url)
    })
    .catch(err=>{
      console.log(err)
    })
     
  }
    return (
      <div className="container">
       <div className="card-signin input-field">
                <h2>Add restaurant</h2>
                <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
                <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                />
                {/* <input
                type="text"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                /> */}

 
                  <div class="input-field col s12">
                    <select
                    onChange={(e) => setType(e.target.value)}>
                      <option value="" disabled selected>Choose type</option>
                      <option value="1">Restoran</option>
                      <option value="2">Kafana</option>
                      <option value="3">Brza Hrana</option>
                      <option value="3">Picerija</option>
                    </select>
                  </div>
               <div className="file-field input-field">
                <div className="btn #ef5350 red lighten-1">
                  <span>upload</span>
                  <input 
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text"/>
                </div>
              </div> 
                <button className="btn waves-effect waves-light #ef5350 red lighten-1" type="submit" name="action"
                onClick={()=>postDetails()}
                >
                    <span>Add restaurant</span>
                </button>
                {/* <Link to="/signin">
                    <h5>Already have an account?</h5>
                </Link> */}
            </div>
            </div>
    )
}
export default AddRestaurant