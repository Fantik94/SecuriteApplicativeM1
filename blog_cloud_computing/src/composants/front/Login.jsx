import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', formData);
            alert('Connexion réussie: Bienvenue ' + formData.email);
        } catch (error) {
            alert('Erreur de connexion: ' + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h2 className="form-header">Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Mot de passe:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </label>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
