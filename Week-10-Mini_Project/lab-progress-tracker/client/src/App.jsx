import { BrowserRouter, Routes, Route } from "react-router-dom";
import LabList from "./components/LabList";
import LabForm from "./components/LabForm";
import LoginPage from "./components/LoginPage";
function App(){
return (
<BrowserRouter>
<Routes>
<Route path="/login" element={<LoginPage/>}/>
<Route path="/" element={<LabList/>}/>
<Route path="/add" element={<LabForm/>}/>
</Routes>
</BrowserRouter>
);
}
export default App;