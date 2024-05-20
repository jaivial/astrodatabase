// App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [texto, setTexto] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newTexto = formData.get("query");
    setTexto(newTexto);

    try {
      await axios.post('/write', { texto: newTexto });
      console.log('Data written to texto.json');
    } catch (error) {
      console.error('Error writing data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-text">Enter text:</label>
        <input
          type="text"
          id="input-text"
          name="query"
          className="text-black"
        />
        <button type="submit">Submit</button>
      </form>
      <p>You typed: '{texto}'</p>
    </div>
  );
};

export default App;
