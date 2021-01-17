import Axios  from 'axios'
import React ,{useEffect,useState} from 'react' 
import styles from "./style.module.css"
import Upload from "./Upload";

function Student() {
    const [assignments,setAssignments]=useState([]);
    const [assignmentsSubmitted,setAssignmentsSubmitted]=useState([]);
    
    const token=JSON.parse(localStorage.getItem("userInfo")).token; 

    useEffect(() => {
        Axios({
            url:"http://localhost:8000/?email=neetu123@gmail.com",
            method:"get",
            headers:{
                Authorization:"Bearer "+token
            }

        }).then((res)=>{
            console.log(res.data.data.assignmentGiven);
            setAssignments(res.data.data.assignmentGiven);
            setAssignmentsSubmitted(res.data.data.assignmentSubmitted);
            console.log(res.data)
        }).catch((err)=>{
             console.log(err)
        })

      
       
    }, [])
    
    let submit='';
    function isSubmitted(i){
         
      for(let value of assignmentsSubmitted){
           submit="";
         if(value.assignmentId==i){
           submit=value;
           return true  
         }
      }
      return false;
       
    }


   

    return (

    

        <div>
           <h1>Assignments</h1>
           <div className={styles.container}>
       <div style={{width:"50px"}}> Id </div> <div>Name</div> <div>Link</div> <div>Deadline</div>{" "} <div>Submission</div>
       <div style={{width:"50px"}}> Grade </div>
       <div style={{width:"150px"}} > Submitted On </div>
      </div>
           <div>
           {assignments.map((item,i) => (
        <div className={styles.container}>
             <div style={{width:"50px"}}>{i}</div>
          <div>{item.name}</div>
          <div>
            <a href={item.path} target="_blank">
              {" "}
              View Assignment{" "}
            </a>
          </div>{" "}
          <div>
            {new Date(
              new Date(item.givenOn).valueOf() +
                1000 * 3600 * 24 * item.deadline
            ).toLocaleDateString()}
          </div>{" "}

          {(isSubmitted(i))?<div ><a href={submit.path} target="_blank">View Submission</a></div>:<Upload id={i} setAssignmentsSubmitted={setAssignmentsSubmitted}  assignmentsSubmitted={assignmentsSubmitted} />}
          
          <div style={{width:"50px"}}>{submit.grade?submit.grade:"-"}</div>
          <div style={{width:"150px"}}>{submit.SubmittedOn?new Date(submit.SubmittedOn).toLocaleDateString():"----"}</div>
        </div>
      ))}
               </div>
        </div>
    )
}

export default Student
