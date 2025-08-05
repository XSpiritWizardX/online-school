import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      }),
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };
  const loginDemo = (e) => {
    e.preventDefault();
    dispatch(thunkLogin({
        email: 'admin@example.io',
        password: 'password'
    }))
    .then(() => closeModal())
    .then(() => {
      // add delay before navigation
      setTimeout(() => {
        navigate('/');
      }, 100);
    });
  };

  const loginDemo2 = (e) => {
    e.preventDefault();
    dispatch(thunkLogin({
        email: 'student@example.com',
        password: 'password'
    }))
    .then(() => closeModal())
    .then(() => {
      // add delay before navigation
      setTimeout(() => {
        navigate('/');
      }, 100);
    });
  };

  const loginDemo3 = (e) => {
    e.preventDefault();
    dispatch(thunkLogin({
        email: 'teacher@example.com',
        password: 'password'
    }))
    .then(() => closeModal())
    .then(() => {
      // add delay before navigation
      setTimeout(() => {
        navigate('/');
      }, 100);
    });
  };
  return (
    <div className="login-form-container-outer">
      <div className="login-form-container-inner">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        {errors.server && (
          <div className="error-message">{errors.server}</div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              className="login-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />

            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
            <button
        className='demo-log-in'
        onClick={loginDemo}
        >
          Demo Admin
        </button>
            <button
        className='demo-log-in'
        onClick={loginDemo2}
        >
          Demo Student
        </button>

        <button
        className='demo-log-in'
        onClick={loginDemo3}
        >
          Demo Teacher
        </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
