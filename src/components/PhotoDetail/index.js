import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY; // Unsplash API key

const PhotoDetail = () => {
  const { id } = useParams(); // Get the photo ID from the route
  const [photo, setPhoto] = useState(null); // Store the photo details
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(false); // Error state

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`);
        if (!response.ok) {
          throw new Error('Failed to fetch photo details');
        }
        const data = await response.json();
        setPhoto(data);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error fetching photo details</div>;
  }

  if (!photo) {
    return <div className="no-photo">No photo found</div>;
  }

  return (
    <div className="photo-detail">
      <img src={photo.urls.full} alt={photo.alt_description || 'Photo'} className="full-image pics" />
      <h1>{photo.alt_description || 'Photo Title Not Available'}</h1>
      <p className="author">Author: {photo.user.name || 'Unknown Author'}</p>
      <p className="description">{photo.description || 'Description Not Available'}</p>
      <a href={photo.links.html} target="_blank" rel="noopener noreferrer" className="view-link">
        View on Unsplash
      </a>
    </div>
  );
};

export default PhotoDetail;
