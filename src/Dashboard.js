import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Navabardesign from './Navabardesign';
import './Dashboard.css';
import './Navbar.css';

const baseUrl = "https://freelancer-mern-1.onrender.com";

const Dashboard = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.replace("/login");
            return;
        }

        axios.get(`${baseUrl}/allprofiles`, {
            headers: {
                'x-auth-token': token
            }
        })
        .then(res => setData(res.data))
        .catch(err => console.error('Request failed', err));
    }, []);

    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Navabardesign />

            <div className="dashboard-container">
                {data.length >= 1 ? (
                    <div className="profile-grid">
                        {data.map(profile => (
                            <div className="profile-card" key={profile._id}>
                                <img
                                    className="profile-avatar"
                                    src={profile.avatar || 'https://tse1.mm.bing.net/th?id=OIP.wHmdLYdYLIK6dd3RC_NnNgHaHa&pid=Api&P=0&h=180'}
                                    alt="Avatar"
                                />
                                <h2 className="profile-name">{profile.name}</h2>
                                <p className="profile-email">{profile.email}</p>
                                <p className="profile-bio">{profile.bio}</p>
                                <p className="profile-skills">
                                    <b>Skills:</b> 
                                    {profile.skill ? profile.skill.split(',').map((skill, index) => (
                                        <span key={index} className="skill-item">
                                            {skill.trim()}{index < profile.skill.split(',').length - 1 ? ', ' : ''}
                                        </span>
                                    )) : 'N/A'}
                                </p>
                                <p className="profile-mobile">{profile.mobile}</p>
                                <p className="profile-rating">
                                    Rating: {profile.averageRating ? profile.averageRating.toFixed(1) : 'N/A'} 
                                    ({profile.totalRatings || 0} reviews)
                                </p>
                                <Link to={`/indprofile/${profile.name}/${profile.email}/${profile.skill}/${profile.mobile}/${profile._id}`} className="profile-link">
                                    <button className='p-button'>View Profile</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No profiles available</div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
