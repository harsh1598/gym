import { useEffect, useState } from "react";
import logosm from "../../assets/images/Lock.png";
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/Locker.png";
import { Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean,
    toggleSidebar: any
}

const Sidebar = (props: SidebarProps) => {

    const [currentRoute, setCurrentRoute] = useState('Dashboard');

    useEffect(() => {
        const currentPath = window.location.pathname;
        const lastSegment = currentPath.split('/').filter(Boolean).pop();
        switch (lastSegment) {
            case "user":
                setCurrentRoute('User');
                break;
            case "product":
                setCurrentRoute('Product');
                break;
            case "setting":
                setCurrentRoute('Setting');
                break;
            case "dashboard":
                setCurrentRoute('Dashboard');
                break;
            default:
                setCurrentRoute('Dashboard');
        }
    }, [currentRoute]);

    return (
        <div className="app-menu navbar-menu">
            <div className="navbar-brand-box">
                <a href="index.html" className="logo logo-dark">
                    <span className="logo-sm">
                        <img src={logosm} alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                        <img src={logolight} alt="" height="17" />
                    </span>
                </a>
                <a href="index.html" className="logo logo-light">
                    <span className="logo-sm">
                        <img src={logosm} alt="" height="40" />
                    </span>
                    <span className="logo-lg">
                        <img src={logolight} alt="" height="40" />
                    </span>
                </a>
                <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                    <i className="ri-record-circle-line"></i>
                </button>
            </div>
            <i className="bi bi-x p-3 position-absolute end-0 top-1 d-xl-none cursor-pointer" onClick={props.toggleSidebar}  style={{ color: 'white', zIndex: 9999 }}></i>
            <div id="scrollbar" className="h-100">
                <div className="container-fluid">
                    <div id="two-column-menu">
                    </div>
                    <ul className="navbar-nav" id="navbar-nav">
                        <li className="menu-title"><span data-key="t-menu">Menu</span></li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentRoute === "Dashboard" ? 'nav-link menu-link active' : 'nav-link menu-link'}`} to={"/dashboard"} onClick={() => setCurrentRoute('Dashboard')}>
                                <i className="ri-dashboard-2-line"></i> <span data-key="t-widgets">Dashboards</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentRoute === "User" ? 'nav-link menu-link active' : 'nav-link menu-link'}`} to={"/user"} onClick={() => setCurrentRoute('user')}>
                                <i className="ri-account-circle-line"></i> <span data-key="t-widgets">User</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;