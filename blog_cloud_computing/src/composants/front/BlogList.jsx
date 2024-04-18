import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { BiPencil } from 'react-icons/bi';
import parse from 'html-react-parser';
import { AuthContext } from '../context/AuthContext';

function BlogList() {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return; // Early exit if not authenticated
    }

    fetch(import.meta.env.VITE_API_URL + '/all-blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Erreur lors de la récupération des blogs', error));
  }, [isAuthenticated]);

  const handleDelete = (id) => {
    fetch(import.meta.env.VITE_API_URL + `/blogs/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setBlogs(blogs.filter(blog => blog.id !== id));
          setDeleteConfirmation(null);
        }
      });
  };

  if (!isAuthenticated || (isAuthenticated && userRole !== "ADMIN")) {
    return <Navigate to="/login" replace />;
  }

  return (
    isAuthenticated && userRole === "ADMIN" && (
      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img className="w-full h-48 object-cover" src={blog.image_url} alt={blog.titre} />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{parse(blog.titre)}</h2>
                <p className="text-gray-700 mb-3">{parse(blog.description)}</p>
                <p className="text-gray-600 text-xs">Par {blog.pseudo}</p>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <button
                      className="text-red-600 hover:text-red-700"
                      onClick={() => setDeleteConfirmation(blog.id)}>
                      <BsTrash size={20} />
                    </button>
                    <Link
                      className="text-blue-600 hover:text-blue-700 ml-2"
                      to={`/edit/${blog.id}`}>
                      <BiPencil size={20} />
                    </Link>
                  </div>
                  {deleteConfirmation === blog.id && (
                    <div className="absolute bg-white border rounded px-4 py-2 shadow-lg">
                      <p className="text-sm">Confirmez la suppression de ce blog ?</p>
                      <div className="flex justify-end space-x-2 mt-2">
                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                onClick={() => handleDelete(blog.id)}>Oui</button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-xs"
                                onClick={() => setDeleteConfirmation(null)}>Annuler</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default BlogList;
