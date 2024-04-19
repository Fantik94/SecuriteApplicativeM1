import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'USER'  // Assumant que vous souhaitez toujours collecter un rôle lors de l'inscription.
    });
    const navigate = useNavigate();  // Créez une instance de useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/register', formData);
            alert('Inscription réussie: ' + response.data);
            navigate('/login');  // Rediriger vers login après l'inscription
        } catch (error) {
            alert('Erreur lors de l\'inscription: ' + (error.response ? error.response.data : "Erreur réseau ou serveur"));
        }
    };

    return (
        <div className="flex items-center justify-center px-6 py-12">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-14 w-auto"
                        src="../../pepe.jpg"
                        alt="pepe"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Création du compte
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Vous avez déjà un compte ? Connectez-vous ici
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
