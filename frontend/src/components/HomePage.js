// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaCalendarAlt, FaDatabase, FaUser, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Add icons
import './css/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  // Mock testimonials data
  const testimonials = [
    { name: 'John Doe', role: 'City Manager', quote: 'This system has revolutionized our waste management process!' },
    { name: 'Sarah Smith', role: 'Waste Collector', quote: 'Real-time data makes my job so much easier.' },
  ];

  // Handle contact form submission (mock for now)
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Urban Waste Management System</h1>
          <p className="tagline">Monitor garbage containers in real-time and optimize waste collection processes.</p>
          <div className="hero-buttons">
            <button className="cta-button primary" onClick={() => navigate('/login')}>
              Get Started
            </button>
            <button className="cta-button secondary" onClick={() => window.scrollTo({ top: document.querySelector('.features-section').offsetTop, behavior: 'smooth' })}>
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Real-Time Monitoring</h3>
            <p>Track container fullness levels using IoT sensors.</p>
            <a href="#monitoring" className="feature-link">Learn More</a>
          </div>
          <div className="feature-card">
            <FaCalendarAlt className="feature-icon" />
            <h3>Automated Scheduling</h3>
            <p>Schedule waste collection based on container data.</p>
            <a href="#scheduling" className="feature-link">Learn More</a>
          </div>
          <div className="feature-card">
            <FaDatabase className="feature-icon" />
            <h3>Data Analytics</h3>
            <p>Analyze waste trends and optimize operations.</p>
            <a href="#analytics" className="feature-link">Learn More</a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <FaUser className="testimonial-icon" />
              <p className="quote">"{testimonial.quote}"</p>
              <p className="author">{testimonial.name}, {testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Your Message" rows="4" required></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Urban Waste Management</h4>
            <p>© 2025 Urban Waste Management. All rights reserved.</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <nav>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-of-service">Terms of Service</a>
              <a href="/contact">Contact Us</a>
            </nav>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;