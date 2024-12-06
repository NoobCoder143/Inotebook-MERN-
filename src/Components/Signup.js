import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  let navigate=useNavigate()
  const [userDetails, setuserDetails] = useState({name:'',email:'',password:''})
  const handleClick = async (e) => {
      e.preventDefault();
      //api call
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
        
          headers: {
            "Content-Type": "application/json",
  
          },
          body: JSON.stringify({ name:userDetails.name,email:userDetails.email,password:userDetails.password})
        }
      
      );
      const json = await response.json()
      console.log(json)
      
            //save auth token and redirect
            localStorage.setItem('token',json.token)
            navigate('/');


  
  }
const handleChange=(e)=>{
          setuserDetails({...userDetails,[e.target.name] : e.target.value})
      }
  return (
    <div> 
      <form>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">
      Name
    </label>
    <input
      type="text"
      className="form-control"
      id="name"
      name='name'
      aria-describedby="emailHelp"
      onChange={handleChange}

    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="exampleInputEmail1"
      name='email'
      aria-describedby="emailHelp"
      onChange={handleChange}

    />
    <div id="emailHelp" className="form-text">
      We'll never share your email with anyone else.
    </div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      name='password'
      className="form-control"
      id="exampleInputPassword1"
      onChange={handleChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
    Confirm Password
    </label>
    <input
      type="password"
      name='cpassword'
      className="form-control"
      id="exampleInputPassword1"
      
    />
  </div>
  <button type="submit" className="btn btn-primary"onClick={handleClick}>
    Submit
  </button>
</form>

    </div>
  )
}

export default Signup