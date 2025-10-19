import { useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function ItemList() {
const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);
const inputRef = useRef(null);
function addItem() {
const newItem = inputRef.current.value;
if (newItem) {
setItems([...items, newItem]);
inputRef.current.value = "";
}
}
return (
<div>
<h3>Item List</h3>


<ul>
{items.map((item, index) => (
<li key={index}>{item}</li>
))}
</ul>
<input type="text" ref={inputRef} placeholder="Add an item" />
<button onClick={addItem}>Add</button>
</div>
);
}
function Home() {
return (
<div>
<h2>Home Page</h2>
<p>Welcome to the home page.</p>
<ItemList />
</div>
);
}
function About() {
return (
<div>
<h2>About Page</h2>
<p>This is the about page of our demo application.</p>
</div>
);
}
function App() {
return (
<BrowserRouter>
<div>
<nav>
<Link to="/">Home</Link> | <Link to="/about">About</Link>
</nav>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
</Routes>


</div>
</BrowserRouter>
);
}
export default App;