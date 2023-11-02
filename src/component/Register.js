import React, { useState } from 'react'
import {  NavLink, useNavigate} from 'react-router-dom'


const Register = () => {

  const [name,setName]= useState("");
  const [email,setEmail]= useState("");
  const [work,setWork]= useState("");
  const [address,setAddress]= useState("");
  const [mobile,setMobile]= useState("");
  const [description,setDescription]= useState("");
  const [age,setAge]= useState("");
   const [error,setError]= useState(false);
  const Navigation= useNavigate();
  
  const addEmployee= async()=>{
  if(!name||!email||!work||!address||!mobile||!description||!age){
      setError(true)
      return false; 
      
      
  }

  let result= await fetch("http://localhost:1000/register",{
    method:"POST",
   
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({name, email, work, address, mobile, description, age})
  });
  result= await result.json();
  if(result.status===404||!result){
    alert("Error and fill the data")
    console.log("error")
    
    
  }
  else{
    alert("Employee added")
    console.log("Employee  Added")
    Navigation('/')
  }

  }


  return (
    <>
      <div className="container">
        <NavLink to='/' className={'btn btn-success mt-3'}> Back to Home</NavLink>
        <h1 className='bg-light text-center mt-4 py-3'>Add Employee</h1>
       
      
           
            <div className="row">
              <div className="mb-3 col-lg-6 col-md-6 col-12 ">
                <label for="exampleInputPassword1" className="form-label">Name</label>
                <input type="text" name='name' onChange={(e)=> setName(e.target.value)}  value={name} className="form-control" id="exampleInputPassword1" />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">

                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email"  name='email'onChange={ (e)=> setEmail(e.target.value)} value={email}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
             
          
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">Age</label>
                <input type="text" className="form-control"value={age}  onChange={ (e)=> setAge(e.target.value)} name='age' id="exampleInputPassword1" />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">Mobile</label>
                <input type="number" class="form-control" value={mobile} onChange={ (e)=> setMobile(e.target.value)} name='mobile' id="exampleInputPassword1" />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">Work</label>
                <input type="text" className="form-control"value={work}  onChange={(e)=>  setWork(e.target.value)} name='work' id="exampleInputPassword1" />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">Address</label>
                <input type="text" class="form-control"value={address}  onChange= { (e)=> setAddress(e.target.value)} name='address' id="exampleInputPassword1" />
              </div>
              <div className="mb-3 col-lg-12 col-md-12 col-12">
                <label for="exampleInputPassword1" class="form-label">Description</label>
                <textarea className='form-control'value={description}  onChange={(e)=> setDescription(e.target.value)} name='description' cols={'30'} rows={'5'}> </textarea>
              </div>
           
              </div>
              <button type="submit" onClick={addEmployee} className="btn btn-primary text-center">Submit</button>
           
         

      


      </div>
    </>
  )
}

export default Register
