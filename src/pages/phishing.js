import React, { useState } from 'react';
import axios from 'axios';

const Phishing = () => {
  const [email, setEmail] = useState(null);

  const simulate = async () => {
    const res = await axios.get('http://localhost:5000/simulate/phishing');
    setEmail(res.data);
  };

  return (
    <div>
      <h2>Phishing Simulation</h2>
      <button onClick={simulate}>Run</button>
      {email && (
        <div style={{ background: '#fff3cd', padding: 20, marginTop: 20 }}>
          <p><strong>From:</strong> {email.from}</p>
          <p><strong>Subject:</strong> {email.subject}</p>
          <p>{email.body}</p>
        </div>
      )}
    </div>
  );
};

export default Phishing;
