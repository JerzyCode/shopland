import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {Home} from "./app/pages/Home.tsx";
import RoleProtectedRoute from "./app/context/RoleProtectedRoute.tsx";
import {Role} from "./app/models/User.ts";
import {AppHeader} from "./app/components/AppHeader.tsx";
import {Container} from "@mui/material";
import {OrderHistory} from "./app/pages/OrderHistory.tsx";
import {OpinionsPage} from "./app/pages/OpinionsPage.tsx";
import {ProductDetails} from "./app/pages/ProductDetails.tsx";


function App() {
    return (
        <div>
            <AppHeader/>
            <Container>
                <Routes>
                    <Route path="/shopland" element={<Home/>}/>
                    <Route path="/shopland/order-history"
                           element={<RoleProtectedRoute element={<OrderHistory/>} requiredRole={Role.USER}/>}/>
                    <Route path="/shopland/opinions"
                           element={<RoleProtectedRoute element={<OpinionsPage/>} requiredRole={Role.USER}/>}/>
                    <Route path="*" element={<Navigate to="/shopland"/>}/>
                    <Route path="/shopland/order-history" element={<OrderHistory/>}/>
                    <Route path="/shopland/product/:id" element={<ProductDetails />} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
