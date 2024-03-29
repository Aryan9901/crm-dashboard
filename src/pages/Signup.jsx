/* eslint-disable react-hooks/exhaustive-deps */
import travelsImg from "../assets/travels.png";
import signupImg from "../assets/signup.png";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../actions/user.action";

function SignUp() {
	const navigate = useNavigate();
	const [isLoginPage, setIsLoginPage] = useState(true);
	const [loginDetails, setLoginDetails] = useState({
		username: "",
		password: "",
	});
	const [signupDetails, setSignupDetails] = useState({
		username: "",
		password: "",
		phone: "",
	});
	const { error, message, loading, user, isAuthenticated } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (isLoginPage) {
			setLoginDetails({ ...loginDetails, [name]: value });
		} else {
			setSignupDetails({ ...loginDetails, [name]: value });
		}
	};

	const loginSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(userLogin(loginDetails));
	};
	const signupSubmitHandler = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		if (message) {
			toast.success(message);
			dispatch({ type: "CLEAR_MESSAGES" });
		}
		if (error) {
			toast.error(error);
			dispatch({ type: "CLEAR_ERRORS" });
		}
	}, [message, error, user]);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard");
		}
	}, [isAuthenticated]);

	return (
		<div className="signup">
			<nav className="login-nav">
				<img src={travelsImg} alt="travels image" />
				<button>Sign Up</button>
			</nav>
			<main className="login-main">
				<section>
					<img src={signupImg} alt="sign up image" />
					<form onSubmit={isLoginPage ? loginSubmitHandler : signupSubmitHandler}>
						<h2>{isLoginPage ? "Log In" : "Sign Up"}</h2>
						<p>Please Enter your details</p>
						<input
							value={isLoginPage ? loginDetails.username : signupDetails.username}
							onChange={onChangeHandler}
							name="username"
							type="text"
							placeholder="Email or Phone Number ..."
						/>
						{isLoginPage ? null : (
							<input onChange={onChangeHandler} value={signupDetails.phone} name="phone" type="text" placeholder="Phone Number" />
						)}
						<input
							onChange={onChangeHandler}
							value={isLoginPage ? loginDetails.password : signupDetails.password}
							name="password"
							type="password"
							placeholder="password"
						/>
						<button className="submitBtn" type="submit">
							{loading ? "Loading..." : isLoginPage ? "Log In" : "Sign Up"}
						</button>
						<aside>OR</aside>
						<div>
							<button>
								<FaGoogle />
								{isLoginPage ? "Log In" : "Sign Up"} with Google
							</button>
							<button>
								<FaFacebookF />
								{isLoginPage ? "Log In" : "Sign Up"} with Facebook
							</button>
						</div>
						<p className="account">
							{isLoginPage ? "Don't" : "Already"} have an Account?{" "}
							<span onClick={() => setIsLoginPage((curr) => !curr)}>{isLoginPage ? "Sign Up" : "Log In"}</span>
						</p>
					</form>
				</section>
			</main>
		</div>
	);
}

export default SignUp;
