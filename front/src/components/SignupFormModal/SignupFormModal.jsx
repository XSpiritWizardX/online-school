import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { Link } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    if (!agreeTerms || !agreePrivacy) {
      return setErrors({
        ...errors,
        agreement: "You must agree to the Terms and Privacy Policy to sign up.",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        avatar_url: avatarUrl,
        bio: bio,
        agreed_to_terms: agreeTerms,
        agreed_to_privacy: agreePrivacy,
        is_email_verified: false,
        themeId: null,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (


    <div className="signup-border-outer">
      <div className="signup-inner">
        <h1>Sign Up</h1>
        {errors.server && <p>{errors.server}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <label>First Name
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </label>
          <label>Last Name
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </label>
          <label>Date of Birth
            <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
          </label>
          <label>Username
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label>Confirm Password
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </label>
          <label>Avatar Image URL (Optional)
            <input type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://example.com/avatar.png" />
          </label>
          <label>Bio (Optional)
            <input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us something about yourself..."
            className="bio-input"
            />
          </label>


          <div className="agreement-section">

          <div className="checkbox-label">
            <input
            className="terms-checkbox"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)} />
            I agree to the
            <Link
            to="/terms-of-service"
            target="_blank"
            className="terms-link"
            >
            Terms of Service
            </Link>
          </div>

          <div className="checkbox-label">
            <input
            className="privacy-checkbox"
            type="checkbox"
            checked={agreePrivacy}
            onChange={(e) => setAgreePrivacy(e.target.checked)} />
            I agree to the
            <Link
            to="/privacy-policy"
            target="_blank"
            className="privacy-link"
            >
            Privacy Policy
            </Link>
          </div>
          </div>



          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          {errors.agreement && <p className="error">{errors.agreement}</p>}
          {errors.email && <p className="error">{errors.email}</p>}
          {errors.username && <p className="error">{errors.username}</p>}

          <button
          type="submit"
          className="signup-button"
          >
            Sign Up
            </button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
