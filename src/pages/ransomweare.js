import React, { useState } from 'react';
import axios from 'axios';

const Ransomware = () => {
  const [result, setResult] = useState(null);

  const handleClick = async () => {
    const res = await axios.get('http://localhost:5000/simulate/ransomware');
    setResult(res.data);
  };

  return (
    <div>
      <h2>Ransomware Simulation</h2>
      <button onClick={handleClick}>Simulate</button>
      {result && (
        <div style={{ marginTop: 20 }}>
          <p><strong>{result.message}</strong></p>
          <p>{result.note}</p>
          <p><em>Encryption key:</em> {result.key}</p>
        </div>
      )}
    </div>
  );
};

export default Ransomware;
