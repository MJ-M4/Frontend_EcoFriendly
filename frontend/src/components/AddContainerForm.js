import React, { useState } from 'react';
import axios from 'axios';

const AddContainerForm = () => {
    const [location, setLocation] = useState('');
    const [fullnessLevel, setFullnessLevel] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/containers', {
            location,
            fullness_level: fullnessLevel
        }).then(response => {
            alert('Container added!');
            window.location.reload();
        }).catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <input type="number" placeholder="Fullness Level" value={fullnessLevel} onChange={(e) => setFullnessLevel(e.target.value)} required />
            <button type="submit">Add Container</button>
        </form>
    );
};

export default AddContainerForm;