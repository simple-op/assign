import Axios from "axios";
import React, { useState, useEffect ,useRef} from "react";
import Upload from "./Upload";
import styles from "./style.module.css";
import  Info  from "./Info";

function Teacher() {
  const [assignments, setAssignments] = useState([]);
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  const [info,setOpenInfo]=useState(false);
  let id=useRef("");
  let name=useRef("")
  let link=useRef("")
  let givenOn=useRef("")
  console.log(id)
  function openInfo(i,e,_name,_link,_givenOn){
    e.stopPropagation();
    setOpenInfo(true);
    id.current=i;
    name.current=_name;
    link.current=_link
    givenOn.current=_givenOn
  }


  useEffect(() => {
    Axios({
      url: "https://assign-backend.herokuapp.com/",
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log(res.data.data.assignmentGiven);
        setAssignments(res.data.data.assignmentGiven);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div onClick={()=>setOpenInfo(false)}>
      <h1>Assignments</h1>
      <Upload assignments={assignments} setAssignments={setAssignments} />
      <div className={styles.container}>
       <div style={{width:"50px"}}> Id </div> <div>Name</div> <div>Link</div>  <div>Given On</div> <div>Deadline</div>{" "}
      </div>
      {info&&<Info  link={link.current} givenOn={givenOn.current} name={name.current} setInfo={setOpenInfo} id={id.current}></Info>}
      {assignments.map((item,i) => (
        <div>

        <div onClick={(e)=>openInfo(i,e,item.name,item.path,item.givenOn)} className={styles.container}>
             <div style={{width:"50px"}}>{i}</div>
          <div>{item.name}</div>
          <div>
            <a href={item.path} target="_blank">
              {" "}
              View Assignment{" "}
            </a>
          </div>{" "}
          <div>
            {
              new Date(item.givenOn).toLocaleDateString()}
          </div>{" "}
          <div>
            {new Date(
              new Date(item.givenOn).valueOf() +
                1000 * 3600 * 24 * item.deadline
            ).toLocaleDateString()}
          </div>{" "}
         
        </div>
      
        </div>
      ))}
    </div>
  );
}

export default Teacher;
