import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = (props: any) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    // const currentPath = window.location.pathname;

    // useEffect(() => {
    //     setIsSidebarOpen(false);
    // }, [currentPath]);

    return (
        <>
            {/* <div className={`g-sidenav-show bg-gray-100  ${isSidebarOpen ? 'g-sidenav-pinned' : ''}`} >
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    <Header toggleSidebar={toggleSidebar} />
                    <div className="container-fluid py-4">
                        {props.component}
                        <Footer />
                    </div>
                </main>
            </div> */}
            <html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size={isSidebarOpen ? 'lg' : 'sm'} data-sidebar-image="none" data-preloader="disable">
                <body className={`twocolumn-panel ${isSidebarOpen ? 'vertical-sidebar-enable' : ''} `}>
                    <div id="layout-wrapper">
                        <Header toggleSidebar={toggleSidebar} />
                        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                        <div className="main-content">
                            <div className="page-content">
                                <div className="container-fluid">
                                    {props.component}
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        </>
    );
};

export default Layout;
