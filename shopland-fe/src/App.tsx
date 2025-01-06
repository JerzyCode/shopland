import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {Home} from "./app/pages/Home.tsx";
import RoleProtectedRoute from "./app/context/RoleProtectedRoute.tsx";
import {Role} from "./app/models/User.ts";
import {AppHeader} from "./app/components/AppHeader.tsx";
import {Container} from "@mui/material";
import {OrderHistory} from "./app/pages/OrderHistory.tsx";
import {Reviews} from "./app/pages/Reviews.tsx";


function App() {
    return (
        <div>
            <AppHeader/>
            <Container>
                <Routes>
                    <Route path="/shopland" element={<Home/>}/>
                    <Route path="/shopland/order-history"
                           element={<RoleProtectedRoute element={<OrderHistory/>} requiredRole={Role.USER}/>}/>
                    <Route path="/shopland/reviews"
                           element={<RoleProtectedRoute element={<Reviews/>} requiredRole={Role.USER}/>}/>
                    <Route path="*" element={<Navigate to="/shopland"/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
