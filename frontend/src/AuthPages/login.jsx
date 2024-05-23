import axiosClient from "../ApiConnection/axiosClient";
import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const statusParam = searchParams.get("status");
        if (statusParam) {
            setStatus(statusParam);
        }
    }, [location.search]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const response = await axiosClient.post("/login", { email, password });
            // Assuming the response contains user and token data
            // setUser(response.data.user);
            // setToken(response.data.token);
            // Redirect to the desired page after successful login
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                const errorData = error.response.data;
                if (errorData.errors && errorData.errors.email) {
                    setEmailError(errorData.errors.email[0]);
                } else {
                    setEmailError("User with this email not found");
                }
                if (errorData.errors && errorData.errors.password) {
                    setPasswordError(errorData.errors.password[0]);
                } else {
                    setPasswordError("Password entered incorrectly");
                }
            } else if (error.response && error.response.status === 422) {
                const errors = error.response.data.errors;
                setEmailError(errors.email);
                setPasswordError(errors.password);
            } else {
                console.error("Error occurred:", error);
            }
        }
    };

    const handleGoogleLogin = () => {
        const redirectUrl = encodeURIComponent("http://localhost:5173/");
        window.location.href = `http://127.0.0.1:8000/api/auth/google?redirect=${redirectUrl}`;
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">Login to Your Account</h1>
                {status && <div className="alert alert-success">{status}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input ref={emailRef} type="email" placeholder="Email" />
                        {emailError && <p className="error">{emailError}</p>}
                    </div>
                    <div className="input-group">
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        {passwordError && <p className="error">{passwordError}</p>}
                    </div>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </form>
                <button onClick={handleGoogleLogin} className="btn btn-block google-btn">Login with Google</button>
            </div>
        </div>
    );
}
