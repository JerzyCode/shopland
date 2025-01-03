import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {Home} from "./app/pages/Home.tsx";
import RoleProtectedRoute from "./app/context/RoleProtectedRoute.tsx";
import {Role} from "./app/models/User.ts";
import {Home2} from "./app/pages/Home2.tsx";
import {AppHeader} from "./app/components/AppHeader.tsx";
import {Container} from "@mui/material";


function App() {
    return (
        <div>
            <AppHeader/>
            <Container>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/test" element={<RoleProtectedRoute element={<Home2/>} requiredRole={Role.ADMIN}/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
