import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav1 from './Nav1';
import axios from 'axios';

const baseUrl = "https://freelancer-mern-1.onrender.com"; 

const Indprofile = () => {
    const { name, email, skill, mobile, _id } = useParams();
    const [rating, setRating] = useState('');
    const [taskprovider, setTaskprovider] = useState('');

    const handleRatingChange = (e) => {
        const value = e.target.value;
        if (value === '' || (Number(value) >= 1 && Number(value) <= 5)) {
            setRating(value);
        }
    };

    const handleTaskProviderChange = (e) => {
        setTaskprovider(e.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault(); // Prevents page reload
        try {
            const response = await axios.get(`${baseUrl}/myprofile`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setTaskprovider(response.data.name);

            const review = {
                taskprovider: response.data.name,
                taskworker: _id,
                rating,
            };

            const reviewResponse = await axios.post(`${baseUrl}/addreview`, review, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            alert(reviewResponse.data);
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    return (
        <div>
            <Nav1 />
            <div className="dashboard">
                <div className="profile-card">
                    <img 
                        className="profile-avatar" 
                        src="https://tse1.mm.bing.net/th?id=OIP.wHmdLYdYLIK6dd3RC_NnNgHaHa&pid=Api&P=0&h=180" 
                        alt="Avatar" 
                    />
                    <h2 className="profile-name">{name}</h2>
                    <p className="profile-email">{email}</p>
                    <p className="profile-bio"></p>
                    <p className="profile-skills">
                        <b>Skills:</b> 
                        <span className='skill'>{skill || 'N/A'}</span>
                    </p>
                    <p className="profile-bio">{mobile}</p>
                </div>
            </div>
            <div className='review'>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>Ratings</h2>
                        <h3>Enter Your Rating</h3>
                        <input 
                            min="1" 
                            max="5" 
                            step="1" 
                            type='number' 
                            placeholder='Enter your rating out of 5' 
                            className='input' 
                            value={rating} 
                            onChange={handleRatingChange}
                        />
                        <br />
                        <button onClick={submitHandler} className='rev-button'>Add rating</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Indprofile;
