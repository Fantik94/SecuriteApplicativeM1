import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

const Accueil = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/all-blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Erreur lors de la récupération des blogs', error));
  }, []);

  return (
    <div className="accueil-container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-2xl font-bold text-center mb-8">Liste des Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map(blog => (
                <div key={blog.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
                    <h2 className="text-xl font-semibold mb-2">{parse(blog.titre)}</h2>
                    <p className="flex-1">{parse(blog.description)}</p>
                    {blog.image_url && (
                      <img 
                        src={blog.image_url} 
                        alt={`Image pour ${blog.titre}`} 
                        className="mt-4 rounded max-w-full h-auto max-h-48" // Définit une hauteur maximale et une largeur maximale tout en maintenant le ratio
                      />
                    )}
                </div>
            ))}
        </div>
    </div>
  );
}

export default Accueil;
