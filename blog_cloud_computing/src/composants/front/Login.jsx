import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { login, setUserRole } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', formData);
            const { role } = response.data;
            setUserRole(role);
            console.log(response.data); // Affichage de la réponse de l'API dans la console
            console.log("Role de l'utilisateur:", role);
            login();
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
