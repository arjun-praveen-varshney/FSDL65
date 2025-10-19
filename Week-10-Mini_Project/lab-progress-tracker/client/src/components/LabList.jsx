import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function LabList(){
const [labs, setLabs] = useState([]);
useEffect(()=>{
axios.get("/api/labs")
.then(res=>setLabs(res.data))
.catch(err=>console.error(err));
},[]);
return (
<div>
<h1>Lab Tracker</h1>
<Link to="/add">+ Add New Lab</Link>
<ul>

5

{labs.map(l=>(
<li key={l._id}>{l.name} - {l.department}</li>
))}
</ul>
</div>
);
}