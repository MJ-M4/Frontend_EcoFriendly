import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ContainerList = () => {
    const [containers, setContainers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/containers')
             .then(response => setContainers(response.data))
             .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Garbage Containers</h2>
            <ul>
                {containers.map(container => (
                    <li key={container.id}>
                        {container.location} - {container.fullness_level}% full
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContainerList;