import { useState, useEffect } from 'react';
import axios from 'axios';

function MyLocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const success = (position) => {
      setPosition(position.coords);

      // Reverse geocode the coordinates using OpenStreetMap
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
      axios.get(url)
        .then(response => {
          setAddress(response.data.display_name);
        })
        .catch(error => {
          console.error('Error fetching address:', error);
        });
    };

    const error = (error) => {
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div>
      {position ? (
        <div>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
          <p>Address: {address}</p>
        </div>
      ) : (
        <p>Error: {error}</p>
      )}
    </div>
  );
}

export default MyLocation
