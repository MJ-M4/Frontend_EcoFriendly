import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <header className="hero-section">
                <h1>Urban Waste Management System</h1>
                <p>Monitor garbage containers in real-time and optimize waste collection processes.</p>
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/bins')}>View Bin Locations</button>
            </header>

            <section className="features-section">
                <h2>Key Features</h2>
                <div className="features-grid">
                    <div className="feature">
                        <h3>Real-Time Monitoring</h3>
                        <p>Track container fullness levels using IoT sensors.</p>
                    </div>
                    <div className="feature">
                        <h3>Automated Scheduling</h3>
                        <p>Schedule waste collection based on container data.</p>
                    </div>
                    <div className="feature">
                        <h3>Data Analytics</h3>
                        <p>Analyze waste trends and optimize operations.</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>© 2023 Urban Waste Management. All rights reserved.</p>
                <nav>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                    <a href="/contact">Contact Us</a>
                </nav>
            </footer>
        </div>
    );
};

export default HomePage;