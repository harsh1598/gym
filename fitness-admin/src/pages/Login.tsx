
// Images
import logo from "../assets/img/logo-ct.png";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>

        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Sign in to continue to Locker</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="name@example.com"
            />
            {errors.email && <span className="error-text">Email is required</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Your Password"
            />
            {errors.password && <span className="error-text">Password is required</span>}
          </div>

          {/* <div className="form-options mb-2">
            <label  className="me-2">
              <input type="checkbox"/> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div> */}

          <button type="submit" className="btn-submit">Log In</button>
        </form>

        <p className="login-footer">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
