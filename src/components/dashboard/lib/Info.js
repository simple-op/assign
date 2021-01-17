import React,{useEffect,useState} from 'react'
import axios from "axios"
import styles from "./style.module.css"
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function Info({id,setInfo,name,link,givenOn}) {

  const [students,setStudents]=useState([]);
  let submissionLink="";
  let submittedOn="";
  let grade="";
  let _id="";

  function handleGrade(e,id,email){
    var config = {
      method: 'post',
      url: `https://assign-backend.herokuapp.com/grade`,
      headers: { 
        'Authorization': ""
      },
      data:{
        grade:e.target.value,
        email,
        id,

      }
    };
    
    axios(config)
    .then(function (response) {
    
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  function getSubmitted(arr){
     
    for(let value of arr){
       if(value.assignmentId==id&&value.teacher=="neetu123@gmail.com"){
         submissionLink=value.path;
         submittedOn=value.SubmittedOn;
         grade=value.grade;
         _id = value.id

       }
    }
    

  }

useEffect(() => {
   

var config = {
  method: 'get',
  url: `https://assign-backend.herokuapp.com/assignment?email=neetu123@gmail.com&id=${id}`,
  headers: { 
    'Authorization': ""
  }
};

axios(config)
.then(function (response) {

  setStudents(response.data.data.students);
})
.catch(function (error) {
  console.log(error);
});



},[])

    return (
        
        <div onClick={(e)=>{e.stopPropagation(); setInfo(false) }} className={styles.infoContainer}>
          <div onClick={(e)=>{e.stopPropagation(); }}  className={styles.info}>
          <div  onClick={(e)=>{e.stopPropagation();setInfo(false) }} className={styles.cross}>X</div>       
          <h2> 
             Assignment Info 
            </h2>
            <h3>
              Id : {id}
              </h3>
              <h3>
               File : <a href={link} target="_blank">Assignment</a> 
              </h3>
            <h3>
              Name : {name}
              </h3>
              <h3>
              Given On : {new Date(givenOn).toLocaleDateString()}
              </h3>
              <h2> 
             Students Submitted 
            </h2>
            <div className={styles.container}>
                   <div style={{width:"100px"}}>Roll No.</div>
                   <div>Name </div>
                   <div>Email</div>
                   <div>Submission</div>
                   <div>Submitted On</div>
                   <div>Grade</div>
                   </div>
             {students.map((s)=>{
                 return ( <div className={styles.container}>
                  <div style={{width:"100px"}}>{s.rollNo}</div>
                  <div>{s.name}</div>
                  <div>{s.email}</div>
                  <div>{getSubmitted(s.assignmentSubmitted)}<a href={submissionLink} target="_blank">Submission</a></div>
                  <div>{new Date(submittedOn).toLocaleDateString()}</div>
                  <div>
                  <FormControl     variant="outlined" 
                      
                      >
                         
                        
                          <Select
                          name="role"
                        className={"dropdown"}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
      //   value={}
       defaultValue={grade}
       
        onChange={(e)=>handleGrade(e,_id,s.email)}
       
      >
         <MenuItem value={"-"}>-</MenuItem>
        <MenuItem value={"A"}>A</MenuItem>
        <MenuItem value={"B"}>B</MenuItem>
        <MenuItem value={"C"}>C</MenuItem>
        <MenuItem value={"D"}>D</MenuItem>
        <MenuItem value={"E"}>E</MenuItem>
        <MenuItem value={"F"}>F</MenuItem>
      </Select>

                      </FormControl>
                  </div>

                  </div>)
             })

             }

              
   
          </div>
           
        </div>
    )
}

export default Info
