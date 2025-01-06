import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../pages/layout";


const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/resume"/>}/>
                <Route path="/resume" element={<Layout/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;