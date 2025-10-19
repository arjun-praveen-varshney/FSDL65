import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function LabForm(){
const [lab, setLab] = useState({name:"",description:"",department
:"",semester:1});
const nav = useNavigate();
const handleSubmit=e=>{
e.preventDefault();
axios.post("/api/labs", lab)
.then(()=>nav("/"))
.catch(err=>console.error(err));
};
return (
<form onSubmit={handleSubmit}>
<h2>Add Lab</h2>
<input placeholder="Name"
value={lab.name}
onChange={e=>setLab({...lab,name:e.target.value})}
required/>
<input placeholder="Department"
value={lab.department}
onChange={e=>setLab({...lab,department:e.target.value})
}
required/>
<input type="number" placeholder="Semester"
value={lab.semester}
onChange={e=>setLab({...lab,semester:+e.target.value})}
required/>

6

<textarea placeholder="Description"
value={lab.description}
onChange={e=>setLab({...lab,description:e.target.
value})}
required/>

<button type="submit">Create</button>
</form>
);
}