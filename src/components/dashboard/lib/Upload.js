import React,{useState} from 'react'
import styles from "./style.module.css"
import {TextField,Button} from '@material-ui/core';
import Axios from "axios";
import  {CircularProgress} from "@material-ui/core";
import {messages} from "../../utility"
import { SettingsSystemDaydream } from '@material-ui/icons';
function Upload({assignments,setAssignments,id,assignmentsSubmitted,setAssignmentsSubmitted}) {
    const [loader,setLoader]=useState(false);    
    const [loader1,setLoader1]=useState(false);
    const [name,setName]=useState("");
    const [deadline,setDeadline]=useState("");
    const [file,setFile]=useState("");
    const [message,setMessage]=useState("");
    const token=JSON.parse(localStorage.getItem("userInfo")).token;
    const role=JSON.parse(localStorage.getItem("userInfo")).role;
 

    function uploadSubmission(){
        setLoader(true);
        Axios({
          url:"https://assign-backend.herokuapp.com/uploadSubmission",
          method:"post",
          headers:{
              Authorization:"Bearer "+token
          },
          data:{
            id: id,
            teacher:"neetu123@gmail.com",
            file
          }
  
      }).then((res)=>{
        setMessage(messages.success)
        setTimeout(()=>setMessage(""),4000)
        setTimeout(()=>{
        setAssignmentsSubmitted(assignmentsSubmitted.concat([{assignmentId:id,path:file,SubmittedOn:new Date(),grade:"-"}]))   
        setLoader(false)
        },2000) 
      }).catch((err)=>{
          setMessage(messages.error)
          setTimeout(()=>setMessage(""),4000)
          setLoader(false)
      })
  
      }



    
    function uploadAssignment(){
        setLoader(true);
      
       
        Axios({
            url:"https://assign-backend.herokuapp.com/uploadAssignment",
            method:"post",
            data:{
                 name:name,
                 file:file,
                 deadline:deadline
            },
            headers:{
                Authorization:"Bearer "+token,
                
            }
        }).then(res=>{
            setMessage(messages.success)
            setTimeout(()=>setMessage(""),4000)
          setLoader(false);
          console.log(res.data);
           setAssignments(assignments.concat([{name,deadline,path:file,givenOn:new Date()}]))
         
        }).catch(err=>{
            setMessage(messages.error)
            setTimeout(()=>setMessage(""),4000)
            setLoader(false);
        })
    }
    
     
    function fileUpload(e){
        setLoader(true);
        const form=new FormData();
        form.append("avatar",e.target.files[0],e.target.files[0].name);
        Axios({
            url:"https://assign-backend.herokuapp.com/upload",
            method:"post",
            data:form,
            headers:{
                Authorization:"Bearer "+token,
                contentType: "multipart/form-data"
            }
        }).then(res=>{
          setLoader(false);
          setMessage(messages.success)
          setTimeout(()=>setMessage(""),4000)
          console.log(res.data.link)
          setFile(res.data.link)
        }).catch(err=>{
            setMessage(messages.error)
            setTimeout(()=>setMessage(""),4000)
            setLoader(false);
        })
    }
    

    return (
        <div>
      {message&&<div style={{backgroundColor:message==messages.success?"green":"red"}} className={styles.error}>{message}</div>}
        <div style={{flexGrow:1}} className={styles.container}>
          
            {role!="student"&&<div>Upload New Assignment</div>}
            {role!="student"&&<TextField value={name} onChange={(e)=>setName(e.target.value)} className={styles.field} type="text" id="outlined-basic" label="Name" variant="outlined" />}

           {role!="student"&&<TextField value={deadline} onChange={(e)=>setDeadline(e.target.value)} className={styles.field} type="number" id="outlined-basic" label="Deadline(days)" variant="outlined" />}

            <TextField className={styles.field} onChange={fileUpload} type="file" id="outlined-basic"  variant="outlined" />

            <Button onClick={role=="student"?uploadSubmission:uploadAssignment} className={styles.field+" "+styles.field} variant="contained" color="secondary">
  {loader?<CircularProgress color="white" className={styles.progress} />:"Upload"}
</Button>

        </div></div>
    )
}

export default Upload
