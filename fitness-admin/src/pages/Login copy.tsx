import { Fragment, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {

    const { handleSubmit, register, formState: { errors }, } = useForm();
    const [themeGradient, setThemeGradient] = useState('');

    const Login = (data: any) => {
        console.log(data);
    }

    useEffect(() => {
        // getGradient();'
        let userData = JSON.parse(localStorage.getItem("UserData") || "{}");
        setThemeGradient(userData.theme_color);
        document.documentElement.style.setProperty('--theme-color', themeGradient);
    }, [themeGradient]);

    return (
        <Fragment>
            <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center background-image">
                <Row className="py-4 flex-grow-1 justify-content-center"> {/* Added flex-grow-1 to ensure full height usage */}
                    <Col lg={5} md={6} sm={10} className="d-flex flex-column justify-content-center mx-auto">
                        <div className="mt-4 shadow-lg border-0 p-4 bg-transparent rounded"> {/* Added padding, light background, and rounded corners */}
                            <Link className="navbar-brand m-0" to="/">
                                {/* <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <img src={logo} className="navbar-brand-img" alt="main_logo" />
                                </div> */}
                                <h3 className="ms-1 text-gradient text-center">MY APP</h3>
                            </Link>
                            <div className="text-left">
                                <h4 className="font-weight-bolder text-info text-white">Welcome back</h4>
                                <p className="mb-0 fs-6 text-white">Enter your email and password to sign in</p>
                            </div>
                            <div className="mt-4"> {/* Added margin to separate from the header */}
                                <form onSubmit={handleSubmit(Login)}>
                                    <div className="mb-3">
                                        <label htmlFor="emailInput" className="form-label fs-5 text-white">Email address</label>
                                        <input
                                            type="email"
                                            {...register("email", { required: true })}
                                            className="form-control shadow-lg text-white bg-transparent"
                                            id="emailInput"
                                            placeholder="name@example.com"
                                        />
                                        {errors.email && <span className="text-danger">Email is required</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="passwordInput" className="form-label fs-5 text-white">Password</label>
                                        <input
                                            type="password"
                                            {...register("password", { required: true })}
                                            className="form-control shadow-lg text-white bg-transparent"
                                            id="passwordInput"
                                            placeholder="Your Password"
                                        />
                                        {errors.password && <span className="text-danger">Password is required</span>}
                                    </div>
                                    <div className="d-grid gap-2 col-12 mx-auto">
                                        <button type="submit" className="btn btn-success w-100 my-4 mb-2">Log In</button>
                                    </div>
                                </form>
                            </div>
                            <div className="text-center pt-0 px-lg-2 px-1 mt-2">
                                <p className="mb-4 text-sm mx-auto fs-5 text-white">
                                    Don't have an account?
                                    <Link to="/signup" className="text-info  font-weight-bold"> Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default Login;