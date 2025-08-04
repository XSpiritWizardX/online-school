import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignupFormPage.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must match the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        display_name: displayName,
        password,
      }),
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-page-inner">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Join our platform today</p>
        </div>

        {errors.server && (
          <div className="error-message">{errors.server}</div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Email</label>
            <input
              className="signup-input"
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
            <label>Display Name</label>
            <input
              className="signup-input"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              placeholder="Enter your display name"
            />
            {errors.displayName && (
              <span className="error">{errors.displayName}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="signup-input"
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

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              className="signup-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
