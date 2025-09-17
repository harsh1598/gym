import { useNavigate } from "react-router-dom";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("UserData") || "{}");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <Navbar
            expand="lg"
            className="custom-header shadow-sm"
        >
            <Container fluid className="px-3">
                {/* Sidebar toggle button for mobile */}
                <button
                    className="btn btn-theme d-xl-none me-3"
                    onClick={toggleSidebar}
                >
                    <i className="fas fa-bars"></i>
                </button>

                {/* Right section */}
                <Nav className="ms-auto align-items-center">
                    <Dropdown align="end">
                        <Dropdown.Toggle
                            as="div"
                            className="d-flex align-items-center px-2 py-1 rounded cursor-pointer no-caret header-profile"
                        >
                            <img
                                src={avatar1}
                                alt="profile"
                                className="rounded-circle me-2"
                                style={{
                                    width: "38px",
                                    height: "38px",
                                    objectFit: "cover",
                                }}
                            />
                            <span className="fw-semibold">
                                {userData?.name || "John Doe"}
                            </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="shadow-sm">
                            <Dropdown.Item href="#profile">
                                <i className="fas fa-user me-2"></i> Profile
                            </Dropdown.Item>
                            <Dropdown.Item href="#settings">
                                <i className="fas fa-cog me-2"></i> Settings
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logout}>
                                <i className="fas fa-sign-out-alt me-2"></i> Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
