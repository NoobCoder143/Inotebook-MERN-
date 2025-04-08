
import React from 'react'
import { useState } from 'react';
import {  useNavigate ,Link} from 'react-router-dom';
const Login = () => {
    let navigate=useNavigate()
    const [userDetails, setuserDetails] = useState({email:'',password:''})
    const handleClick = async (e) => {
        e.preventDefault();
        //api call
        const response = await fetch(
          "http://localhost:5000/api/auth/login",
          {
            method: "POST",
          
            headers: {
              "Content-Type": "application/json"
              
            },
            body: JSON.stringify({email:userDetails.email,password:userDetails.password})
          }
        
        );
        const json = await response.json()
        console.log(json)
        if(json.success){
              //save auth token and redirect
              localStorage.setItem('token',json.token)
              navigate('/');


        }
        else{
            alert("Invalid credentials")
        }
    }
 const handleChange=(e)=>{
            setuserDetails({...userDetails,[e.target.name] : e.target.value})
        }
     
  return (
    <div>
      <h2>Login To Continue</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="email"
      name='email'
      aria-describedby="emailHelp"
      onChange={handleChange}
      value={userDetails.email}
    />
    <div id="email" className="form-text">
      We'll never share your email with anyone else.
    </div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      name='password'
      onChange={handleChange}
      value={userDetails.password}
    />
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleClick}>
    Submit
  </button>
  <p className='Text my-2'>
    Don't have a Account? <Link to='/Signup'>Signup</Link>
  </p>
</form>

    </div>
  )
}

export default Login