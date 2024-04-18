import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assurez-vous que le chemin d'importation est correct

function EditBlog() {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    titre: '',
    description: '',
    image_url: '',
    pseudo: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      return; // Early exit if not authenticated
    }

    fetch(import.meta.env.VITE_API_URL + `/blogs/${id}`)
      .then(response => response.json())
      .then(data => setBlog(data))
      .catch(err => console.error('Erreur lors de la récupération du blog', err));
  }, [id, isAuthenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(import.meta.env.VITE_API_URL + `/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    })
      .then(response => {
        if (response.ok) {
          navigate('/blog-list'); // Redirect to blog list after successful update
        }
      }).catch(err => console.error('Erreur lors de la mise à jour du blog', err));
  };

  if (!isAuthenticated || (isAuthenticated && userRole !== "ADMIN")) {
    return <Navigate to="/login" replace />;
  }

  return (
    isAuthenticated && userRole === "ADMIN" && (
      <div className="edit-blog-container">
        <h2>Modifier le Blog</h2>
        <form onSubmit={handleSubmit} className="edit-blog-form">
          <div className="form-group">
            <label>Titre</label>
            <input
              type="text"
              className="form-control"
              value={blog.titre || ''}
              onChange={(e) => setBlog({ ...blog, titre: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              value={blog.description || ''}
              onChange={(e) => setBlog({ ...blog, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>URL de l'image</label>
            <input
              type="text"
              className="form-control"
              value={blog.image_url || ''}
              onChange={(e) => setBlog({ ...blog, image_url: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Pseudo</label>
            <input
              type="text"
              className="form-control"
              value={blog.pseudo || ''}
              onChange={(e) => setBlog({ ...blog, pseudo: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Mettre à jour</button>
        </form>
      </div>
    )
  );
}

export default EditBlog;
