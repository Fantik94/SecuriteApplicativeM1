import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'USER'  
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', formData);
            alert('Inscription réussie: ' + response.data);
        } catch (error) {
            alert('Erreur lors de l\'inscription: ' + error.response.data);
        }
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h2 className="form-header">Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Mot de passe:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </label>
                    <button type="submit">S'inscrire</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
