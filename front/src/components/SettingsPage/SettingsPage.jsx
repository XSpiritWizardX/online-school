import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkUpdateUser } from "../../redux/session";
import "./SettingsPage.css";

function SettingsPage() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    email: user?.email || "",
    firstName: user?.firstname || "",
    lastName: user?.lastname || "",
    address: user?.address || "",
    phone: user?.phone_number || "",
    dateOfBirth: user?.date_of_birth || "",
    avatarUrl: user?.avatar_url || "",
    bio: user?.bio || "",
    theme: user?.theme || "default",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    setEditing(false);
    setForm({
      email: user?.email || "",
      firstName: user?.firstname || "",
      lastName: user?.lastname || "",
      address: user?.address || "",
      phone: user?.phone_number || "",
      dateOfBirth: user?.date_of_birth || "",
      avatarUrl: user?.avatar_url || "",
      bio: user?.bio || "",
      theme: user?.theme || "default",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation as needed
    dispatch(thunkUpdateUser(form));
    setEditing(false);
  };

  return (
    <div className="settings-page-container">
      <div className="settings-page-top">
        <div className="avatar-section">
          <img
            src={form.avatarUrl || "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753821555/52Vd1ZNcqubd9rPJIuUR--0--6ctwk_kwbdne.jpg"}
            alt="profile"
            className="user-avatar-large"
          />
        </div>
        <div className="settings-header">
          <h1>Settings</h1>
          {!editing && (
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="settings-page-content">
        <h2>Account Settings</h2>
        <form onSubmit={handleSubmit} className="settings-form">
            <div
                className="name-section"
            >
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            Profile Picture URL:
            <input
              type="url"
              name="avatarUrl"
              value={form.avatarUrl}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            Theme:
            <select
              name="theme"
              value={form.theme}
              onChange={handleChange}
              disabled={!editing}
            >
              <option value="default">Default</option>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              {/* Add more themes as needed */}
            </select>
          </label>

            </div>



          <div
            className="address-section"
          >
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            Zipcode:
            <input
              type="text"
              name="zipcode"
              value={form.zipcode}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          </div>

          <div
            className="address-section"
          >

          <label>
            Phone Number:
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          </div>



          <label>
            Bio:
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              disabled={!editing}
              rows={3}
            />
          </label>
          {editing && (
            <>
              <label>
                New Password:
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </label>
              <label>
                Confirm Password:
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </label>
            </>
          )}
          {editing && (
            <div className="settings-actions">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;
