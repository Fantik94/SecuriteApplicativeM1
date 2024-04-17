import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

const Accueil = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/all-blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Erreur lors de la récupération des blogs', error));
  }, []);

  return (
    <div className="accueil-container">
        <h1>Liste des Blogs</h1>
        {blogs.map(blog => (
            <div key={blog.id} className="blog-card">
                <div className="texte">
                    <strong>{parse(blog.titre)}</strong>
                    {parse(blog.description)}
                    {blog.image_url && <img src={blog.image_url} alt={`Image pour ${blog.titre}`} />}
                </div>
            </div>
        ))}
    </div>
);
}

export default Accueil;