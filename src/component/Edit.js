import React,{useState,useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';


const Edit = () => {
   const Navigation= useNavigate();
    const [inputVal,setInputVal]=useState({
        name:"",
        email:"",
        age:"",
        mobile:"",
        work:"",
        address:"",
        description:""
       })
    
      const setData=(e)=>{
        console.log(e.target.value)
        const {name, value}=e.target;
        setInputVal((preVal)=>{
    
          return{
            ...preVal,[name]:value
          }
        })
      }







    
  const [getUserData, setUserData]= useState([])
 console.log(getUserData)

  const {id}= useParams("");
  console.log(id)

  const userData= async()=>{
     
    let result= await fetch(`http://localhost:1000/employee/${id}`,{
      method:"GET",
  
      headers:{"Content-type":"application/json"}
    });
    result= await result.json();
    if(result.status===404||!result){
      alert("Error and fill the data")
      console.log("error")
      
    }
    else{
      
       setInputVal(result)
      console.log(result)
    }
   }


      
   useEffect(()=>{
    userData();
  },[])


   const updateUser= async(e)=>{
      e.preventDefault();

      const {name, email, work, address, mobile, description,age} =inputVal;

      const result2= await  fetch(`http://localhost:1000/updateuser/${id}`,{
        
        method:"PATCH",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
          name, email, work, address, mobile, description,age

        })
      })

     const data2= await result2.json();
     console.log(data2);
      if(data2){
        alert("updated successfully")
        Navigation('/')
      }
      else{
        alert("not updated")
      }
   }


  return (
    <>
    <div className="container">
      <NavLink to='/' className={'btn btn-success mt-3'}> Back to Home</NavLink>
      <h1 className='bg-light text-center mt-4 py-3'> Update Employee</h1>
     
    
          <form className='mt-4'>
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12 ">
              <label for="exampleInputPassword1" className="form-label">Name</label>
              <input type="text" name='name' onChange={setData}  value={inputVal.name} className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">

              <label for="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email"  name='email'onChange={setData} value={ inputVal.email}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
           
        
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">Age</label>
              <input type="text" className="form-control"value={inputVal.age}  onChange={setData} name='age' id="exampleInputPassword1" />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">Mobile</label>
              <input type="number" class="form-control" value={inputVal.mobile} onChange={setData} name='mobile' id="exampleInputPassword1" />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">Work</label>
              <input type="text" className="form-control"value={inputVal.work}  onChange={setData} name='work' id="exampleInputPassword1" />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">Address</label>
              <input type="text" class="form-control"value={inputVal.address}  onChange={setData} name='address' id="exampleInputPassword1" />
            </div>
            <div className="mb-3 col-lg-12 col-md-12 col-12">
              <label for="exampleInputPassword1" class="form-label">Description</label>
              <textarea className='form-control'value={inputVal.description}  onChange={setData} name='description' cols={'30'} rows={'5'}> </textarea>
            </div>
         
            </div>
            <button type="submit" onClick={updateUser} class="btn btn-primary text-center">Submit</button>
          </form>
       

    


    </div>
  </>
  )
}

export default Edit
