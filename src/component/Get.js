import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react'
import { EditOutlined , DeleteOutlined } from '@ant-design/icons';
import { Stack, Button } from '@mui/material';
import { Modal } from 'antd';


export default function Get() {

  const[userList,setuserList]=useState([]);
  const [updateuser , setupdateuser]=useState({})
  const [Newuser , setNewuser]= useState({})
  const [skip, setSkip]= useState(0)
  const [limit, setLimit]=useState(14)

  useEffect(()=>{
    const ListofArr =async () =>{
      const userdata = await axios.get(`https://dummyjson.com/users?skip=${skip}&limit=${limit}`)
      setuserList(userdata.data.users) 
    }
    ListofArr();
  },[skip,limit])

  const handleskip=(pageNo)=>{
    setSkip((pageNo-1)*limit)
  }
  
const handlelimit=(limitnumber)=>{
setSkip(0)
setLimit(limitnumber)
}

  const [open, setOpen] = useState(false);
  const [openNew, setopenNew]= useState(false)
  const handleCloseNew = () => {setopenNew(false);};

  const handleClickOpen = (e) => {
    setupdateuser(e);
     setOpen(true);
  }

  const handleClose = () => {setOpen(false);};
  
  
  const handlevalue =(e,key) =>{
    setupdateuser({...updateuser, [key]:e.target.value})
    console.log({...updateuser, [key]:e.target.value});
  }

  const handlesave = async ()=> {
    const user =await axios.put(`https://dummyjson.com/users/${userList.id}`,updateuser)
    setupdateuser(user.data)
    console.log(user.data)
    setOpen(false)


  }

   const handledelete= async (e)=>{
    const deletedata = await axios.delete(`https://dummyjson.com/users/${e.id}`)
    console.log(deletedata.data); 
  }

   
   const handlenewuser=()=>{
    setopenNew(true);
   }
   
  const handleAddUSer= (e,key1)=> {
   setNewuser ({...Newuser,[key1]:e.target.value})
  //  console.log({...Newuser,[key1]:e.target.value});
  }


const saveData=  async ()=>{
  const Adduser = await axios.post('https://dummyjson.com/users/add',Newuser)
  console.log(Adduser.data);
  setopenNew(false)
}
   

    //--------------------------------------------------------------------------------------

  return (
    <div className='text-center'>
     <table className="table table-dark table-striped">
  <thead> 
    <tr>
      <th scope="col">id</th>
      <th scope="col">firstName</th>
      <th scope="col">lastName</th>
      <th scope="col">Email</th>
      <th>
      <Button variant='contained'onClick={handlenewuser}  >Create New User</Button>   </th>   
    </tr>
  </thead>
  <tbody>
    {userList.map((user)=>{
      return(
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td  >
          <div className='d-flex align-items-center'>
        <Stack direction={"row"} spacing={9}>

     <EditOutlined onClick={()=> {handleClickOpen(user)}}   />
      <DeleteOutlined onClick={()=>{handledelete(user )}} />
     </Stack>
          </div>
     </td>
     
    </tr>
      )
    })}
  </tbody>
</table>


<Modal
        title="Edit user data"
        centered
        open={open}
        onOk={handlesave}
        onCancel={handleClose}
        okText="save"
      >
        
       firstName :- <input type='text' value={updateuser.firstName} onChange={(e)=> {handlevalue(e,"firstName")}} /><br/>
       lastName :- <input type='text' value={updateuser.lastName} onChange={(e)=> {handlevalue(e,"lastName")}} /><br/>
       email :-   <input type='text' value={updateuser.email} onChange={(e)=> {handlevalue(e,"email")}} /><br/><br/>
       {/* <button className='btn btn-primary ' text-aligh="center" onClick={handlesave} >save</button> */}
      </Modal>

       <Modal

        title="Add new user"
        centered
        open={openNew}
        onOk={saveData}
        onCancel={handleCloseNew}
        okText="save"
      >
       
       firstName :- <input type='text' onChange={(e)=> {handleAddUSer(e,"firstName")}} /><br/>
       lastName :- <input type='text' onChange={(e)=> {handleAddUSer(e,"lastName")}} /><br/>
       email :- <input type='text'  onChange={(e)=> {handleAddUSer(e,"email")}} /><br/><br/>
       {/* <button className='btn btn-primary ' text-aligh="center" onClick={saveData} >save</button> */}
       </Modal>

      <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item">
      <button className="page-link" onClick={()=>setSkip(skip-limit)}>Previous</button>
    </li>
    <li className="page-item"><button className="page-link" onClick={()=>{handleskip(1)}}>1</button></li>
    <li className="page-item"><button className="page-link" onClick={()=>{handleskip(2)}}>2</button></li>
    <li className="page-item"><button className="page-link" onClick={()=>{handleskip(3)}}>3</button></li>
    <li className="page-item"><button className="page-link" onClick={()=>{handleskip(4)}}>4</button></li>
    <li className="page-item"><button className="page-link" onClick={()=>{handleskip(5)}}>5</button></li>
    <li className="page-item">
      <button className="page-link" onClick={()=>setSkip(skip+limit)}>Next</button>
    </li>
  </ul>
</nav>
<div className="dropdown text-center">
  Transactions Per Page : <input className="btn btn-secondry dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" value={`${limit}`}>
    
  </input>
  <ul className="dropdown-menu">
    <li><button className="dropdown-item" type="button" onClick={()=>{handlelimit(14)}}>14</button></li>
    <li><button className="dropdown-item" type="button" onClick={()=>{handlelimit(28)}}>28</button></li>
    <li><button className="dropdown-item" type="button" onClick={()=>{handlelimit(42)}}>42</button></li>
  </ul>
  </div>
 
    </div>
  )
}
  