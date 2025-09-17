import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WebService from "../../utility/WebService";
import toast from "react-hot-toast";

const Footer = () => {
    // 'linear-gradient(310deg, #344767 0%, #344767 100%)'
    const [themeGradient, setThemeGradient] = useState('linear-gradient(310deg, #344767 0%, #344767 100%)');

    useEffect(() => {
        // getGradient();'
        let userData = JSON.parse(localStorage.getItem("UserData") || "{}");
        if (!userData) {
            setThemeGradient(userData.theme_color);
        }
        document.documentElement.style.setProperty('--theme-color', themeGradient);
    }, [themeGradient]);

    const switchGradient = (theme: string) => {
        let newGradient = theme;
        setThemeGradient(newGradient);
        let userData = JSON.parse(localStorage.getItem("UserData") || "{}");
        var obj: any = {};
        obj.id = userData.id;
        obj.theme_color = newGradient;
        // setShowLoader(true);
        WebService.putAPI({
            action: `/update-theme`,
            body: obj,
            // id: "form-layout-submit-btn",
        })
            .then((res: any) => {
                toast.success(res.message);
                setThemeGradient(newGradient);
                userData.theme_color = newGradient;
                localStorage.setItem('UserData', JSON.stringify(userData));
                // getGradient()
                // goBack();
            })
            .catch((e) => {
                // setShowLoader(false);
            });

    };

    return (
        <>
            <footer className="footer pt-2 fixed-bottom">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-4 mb-lg-0 mb-4">
                            <div className="copyright text-center text-sm text-muted text-lg-start">
                                © {new Date().getFullYear()} {""}
                                <Link to={"/dashboard"} className="font-weight-bold">MY App</Link>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-lg-0 mb-4">
                            <div className="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                                {/* secondary */}
                                <button type="button" className="btn bg-gradient-secondary me-1" onClick={() => switchGradient('linear-gradient(310deg, #8392AB 0%, #8392AB 100%)')}></button>
                                {/* Black */}
                                <button type="button" className="btn bg-gradient-dark me-1" onClick={() => switchGradient('linear-gradient(310deg, #344767 0%, #344767 100%)')}></button>
                                {/* Red */}
                                <button type="button" className="btn bg-gradient-danger me-1" onClick={() => switchGradient('linear-gradient(310deg, #dd4e41 0%, #f12020)')}></button>
                                {/* Pink */}
                                <button type="button" className="btn bg-gradient-primary me-1" onClick={() => switchGradient('linear-gradient(310deg, #cb0c9f 0%, #cb0c9f 100%)')}></button>
                                {/* Blue */}
                                <button type="button" className="btn bg-gradient-info me-1" onClick={() => switchGradient('linear-gradient(310deg, #17c1e8 0%, #17c1e8')}></button>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                <li className="nav-item">
                                    <Link to={"/dashboard"} className="nav-link text-muted">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/user"} className="nav-link text-muted">Userlist</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/"} className="nav-link text-muted">Profile</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;