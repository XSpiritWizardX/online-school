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
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zipcode: user?.zipcode || "",
      country: user?.country || "",
      display_name: user?.display_name || "",
      phone_number: user?.phone_number || "",
      date_of_birth: user?.date_of_birth || "",
      avatar_url: user?.avatar_url || "",
      bio: user?.bio || "",
      theme_id: user?.theme_id || "default",
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
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zipcode: user?.zipcode || "",
      country: user?.country || "",
      display_name: user?.display_name || "",
      phone_number: user?.phone_number || "",
      date_of_birth: user?.date_of_birth || "",
      avatar_url: user?.avatar_url || "",
      bio: user?.bio || "",
      theme_id: user?.theme_id || "default",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation as needed
    const {confirmPassword, ...newForm} = form;
    dispatch(thunkUpdateUser(newForm));
    setEditing(false);
  };

  return (
    <div className="settings-page-container">
      <div className="settings-page-top">
        <div className="avatar-section">
          <img
            src={form.avatar_url || "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1753821555/52Vd1ZNcqubd9rPJIuUR--0--6ctwk_kwbdne.jpg"}
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
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            Profile Picture URL:
            <input
              type="url"
              name="avatar_url"
              value={form.avatar_url}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            Theme:
            <select
              name="theme_id"
              value={form.theme_id}
              onChange={handleChange}
              disabled={!editing}
            >
              <option value="0">Default</option>
              <option value="1">Dark</option>
              <option value="2">Light</option>
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
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth}
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
