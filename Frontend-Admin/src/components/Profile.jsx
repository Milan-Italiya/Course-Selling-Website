import React, { useState, useEffect } from 'react';
import '../css/Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        role: 'Admin',
    });

    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Simulate fetching profile data (optional)
    useEffect(() => {
        // Replace this with real API call if needed
        setProfile({
            name: 'Milan Italiya',
            email: 'milan@example.com',
            role: 'Admin',
        });
    }, []);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
        // Call your API to update profile
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert('New password and confirm password do not match!');
            return;
        }
        alert('Password changed successfully!');
        // Call your API to update password
    };

    return (
        <div className="profile-container">
            <h2>Admin Profile</h2>

            <form className="profile-form" onSubmit={handleProfileSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                />

                <label>Role</label>
                <input type="text" value={profile.role} disabled />

                <button type="submit">Update Profile</button>
            </form>

            <h3>Change Password</h3>
            <form className="profile-form" onSubmit={handlePasswordSubmit}>
                <label>Old Password</label>
                <input
                    type="password"
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                />

                <label>New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                />

                <label>Confirm New Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                />

                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default Profile;
