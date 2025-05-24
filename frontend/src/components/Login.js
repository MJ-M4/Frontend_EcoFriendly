import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ecoFriendlyLogo from '../Photos/Ecofriendly.jpg';
import './css/Login.css';

const Login = ({ onLogin, isAuthenticated }) => {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/general');
    }
  }, [isAuthenticated, navigate]);

=======
>>>>>>> 68fa09bf9813974cbf1e28028ae9e4abf76402a3
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
<<<<<<< HEAD
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        onLogin(role); // Pass the role to the parent component to set isAuthenticated
        setIsLoading(false);
      } else {
        // Handle error from backend
        setError(data.error || 'Login failed. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please check your network and try again.');
=======
      const response = await fetch('http://localhost:5005/local/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity, password }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok && data.status === 'success') {
        onLogin(data);
        navigate('/general');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Failed to connect to the server. Please check if the backend is running.');
    } finally {
>>>>>>> 68fa09bf9813974cbf1e28028ae9e4abf76402a3
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/EcofriendlyBackground.jpg)` }}>
      <div className="login-box">
        <img src={ecoFriendlyLogo} alt="EcoFriendly System Logo" className="login-logo" />
        <h2>Login to EcoFriendly System</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="identity">Identity</label>
            <input
              type="text"
              id="identity"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              required
              placeholder="Enter your identity"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="form-input"
              aria-describedby="password-error"
            />
            <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >{showPassword ? 'Hide' : 'Show'}
              </button>
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
          <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;