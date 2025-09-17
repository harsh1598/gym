import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Container } from "reactstrap";

const Layout = ({ component }: any) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
            {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}

            {/* Main Content */}
            <div className="main-content">
                <Header toggleSidebar={toggleSidebar} />
                <Container fluid className="p-4 container-content flex-grow-1">
                    {component}
                </Container>
            </div>
        </div>
    );
};

export default Layout;
