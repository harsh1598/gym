import { useEffect, useState } from "react";
import logosm from "../../assets/images/Lock.png";
import { Nav, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SidebarButton from "./SidebarButton";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar = (props: SidebarProps) => {
    const [currentRoute, setCurrentRoute] = useState("Dashboard");

    useEffect(() => {
        const currentPath = window.location.pathname;
        const lastSegment = currentPath.split("/").filter(Boolean).pop();
        switch (lastSegment) {
            case "user":
                setCurrentRoute("User");
                break;
            case "product":
                setCurrentRoute("Product");
                break;
            case "setting":
                setCurrentRoute("Setting");
                break;
            case "dashboard":
                setCurrentRoute("Dashboard");
                break;
            default:
                setCurrentRoute("Dashboard");
        }
    }, []);

    return (
        <Offcanvas
            show={props.isOpen}
            onHide={props.toggleSidebar}
            responsive="xl"
            className="custom-sidebar shadow-sm"
        >
            {/* Logo Section */}
            <div className="d-flex align-items-center justify-content-center py-3 border-bottom">
                <img
                    src={logosm}
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                    }}
                    alt="Logo"
                />
            </div>

            {/* Nav Links */}
            <Offcanvas.Body className="p-0 position-relative">
                <Nav className="flex-column pt-2">
                    <Nav.Item>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `nav-link sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <i className="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                        <NavLink
                            to="/user"
                            className={({ isActive }) =>
                                `nav-link sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <i className="fas fa-users"></i>
                            <span>Users</span>
                        </NavLink>
                    </Nav.Item>

                    {/* Button at bottom */}
                    <div className="sidebar-bottom-btn-wrapper">
                        <SidebarButton />
                    </div>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Sidebar;
