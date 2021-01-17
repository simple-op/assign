import React from 'react';
import Student from "./lib/student";
import Teacher from "./lib/teacher"

function Dashboard() {
    
    const {name,email,role}=JSON.parse(localStorage.getItem("userInfo"));
    
   
    

    return (

        <div>
           
           <h2>Hey {name} Welcome to Dashboard!! </h2>
           <div>Your email : {email}</div>
           <div>Role : {role}</div>

           {role==="teacher"?<Teacher/>:<Student/>
}
        </div>
    )
}

export default Dashboard;
