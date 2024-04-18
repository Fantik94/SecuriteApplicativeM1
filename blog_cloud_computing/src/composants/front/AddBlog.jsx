import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

function AddBlog() {
  const { isAuthenticated } = useContext(AuthContext);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = { titre, description, image_url, pseudo };

    const response = await fetch(import.meta.env.VITE_API_URL + '/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });

    if (response.ok) {
      setMessage('Blog ajouté avec succès');
      setTitre('');
      setDescription('');
      setImageUrl('');
      setPseudo('');
    } else {
      setMessage('Erreur lors de l\'ajout du blog');
    }
  };

  // Redirection si non authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="add-blog-container mt-5">
      <h2 className="text-lg font-bold mb-3">Ajouter un Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label>Titre:</label>
          <input
            type="text"
            className="form-control"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>URL de l'Image:</label>
          <input
            type="text"
            className="form-control"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Pseudo:</label>
          <input
            type="text"
            className="form-control"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Ajouter le Blog</button>
        {message && <p className="text-green-500">{message}</p>}
      </form>
    </div>
  );
}

export default AddBlog;
