import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header = (props: HeaderProps) => {

    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem("UserData") || "{}");
    // alert("userData", userData);

    const logout = () => {
        localStorage.removeItem('UserData');
        localStorage.removeItem('token');
        localStorage.clear();
        // dispatch(logoutUser());
        navigate("/login"); //
    }

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg  bg-gradient-dark_theme z-index-3 py-2 mt-4 rounded-pill">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <Link className="navbar-brand text-white" to={"/dashboard"} rel="tooltip" data-placement="bottom" target="">
                        {/* Welcome, */}
                        <p className="mb-1 text-white col-12 text-truncate" style={{ fontSize: "14px" }}>
                            {/* Welcome,{" "}{userData.first_name + " " + userData.last_name} */}
                            Welcome,{" "}{userData?.first_name ? userData?.first_name : "Admin"}
                        </p>
                    </Link>
                    <div className="dropdown ms-auto">
                        <Link className="text-white cursor-pointer" to="" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-user"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end px-2 py-3" aria-labelledby="dropdownMenuButton">
                            <li>
                                <Link className="dropdown-item" to={"/profile"}>
                                    <i className="fa fa-user text-dark fs-16 align-middle me-2"></i>Profile
                                </Link>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={logout}>
                                    <i className="fa fa-sign-out text-dark fs-16 align-middle me-2"></i>Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                    <li className="nav-item d-xl-none ps-3 d-flex align-items-center" onClick={props.toggleSidebar}>
                        <Link to="#" className="nav-link text-body p-0" id="iconNavbarSidenav">
                            <div className="sidenav-toggler-inner">
                                <i className="sidenav-toggler-line"></i>
                                <i className="sidenav-toggler-line"></i>
                                <i className="sidenav-toggler-line"></i>
                            </div>
                        </Link>
                    </li>
                </div>
            </nav>
        </div>
    );
}

export default Header;