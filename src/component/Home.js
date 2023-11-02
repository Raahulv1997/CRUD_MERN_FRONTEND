
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';





export default function Home() {
   
  const [getUserData, setUserData]= useState([])
  const Navigation= useNavigate();
   console.log(getUserData);
  const getEmployee= async()=>{
    
   
       
    let result= await fetch("http://localhost:1000/employee",{
      method:"GET",
  
      headers:{"Content-type":"application/json"}
    });
    result= await result.json();
    if(result.status===404||!result){
      alert("Error and fill the data")
      console.log("error")
      
      
    }
    else{
      
      setUserData(result)
      console.log(result)
    }
  
    }






    useEffect(()=>{
      getEmployee();
    },[])




     const deleteUser = async(id)=>{
    
       const res2= await fetch(`http://localhost:1000/deleteEmployee/${id}`,{
        method:"DELETE",
  
      headers:{"Content-type":"application/json"}
       })

       const deleteData= await res2.json();
         console.log(deleteData);
         if(!deleteData.status===200){
         
          console.log("not delete")
          alert("not delete")
        
         }
         else{
          console.log("delete")
          alert("delete")
         }
     }

  return (
    <>
   <div className="mt-5">
   <div className="container  overflow-auto">
    
       <div className="add-btn mt-2 text-end ">
       <NavLink  to={'/register'}> <button className='btn btn-primary '>Add Employee</button> </NavLink>
       </div>
       
    <h1 className='text-center  mt-3 mb-3 bg-success py-3 text-white'>Empolyee Details</h1>
    <table class="table table-striped ">
  <thead className='table-dark'>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">USERNAME</th>
      <th scope="col">EMAIL</th>
      <th scope="col">JOB</th>
      <th scope="col">NUMBER</th>
      <th scope="col" className='text-center'>OPERATIONS</th>
    </tr>
  </thead>
  <tbody>
     {
        getUserData.map((element,id)=>{
          return(
            <>
              
    <tr>
      <th scope="row">{id+1}</th>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.work}</td>
      <td>{element.mobile}</td>
      <td>
        <div className="d-flex justify-content-between">

        <NavLink  to={`view/${element._id}`}> <button className='btn btn-success' ><RemoveRedEyeIcon/></button> </NavLink>
        <NavLink to ={`edit/${element._id}`}> <button className='btn btn-primary'><EditIcon/></button> </NavLink>
          <button onClick={()=>deleteUser(element._id)} className='btn btn-danger'><DeleteIcon/></button>
        </div>
      
      </td>
    </tr>
            </>
          )
        })
     }

 
  
  </tbody>
</table>
    </div>
   </div>
    </>
  )
}
