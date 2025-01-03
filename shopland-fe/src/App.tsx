import './App.css'
import {Route, Routes} from "react-router-dom";
import {Home} from "./app/pages/Home.tsx";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </div>
    )
}

export default App
