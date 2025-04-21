import React, { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div style={styles.preloader}>
          <div style={styles.cyberLoader}>Initializing System...</div>
          <div style={styles.loaderBar}>
            <div style={styles.loaderBarInner}></div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <h1>Welcome to the Admin Dashboard</h1>
          <p>This is your main page content.</p>
        </div>
      )}
    </div>
  );
}

// 🔧 Internal CSS in JS style
const styles = {
  preloader: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  cyberLoader: {
    fontSize: '28px',
    color: '#00ff00',
    textShadow: '0 0 5px #00ff00, 0 0 10px #00ff00',
    animation: 'glow 1.5s infinite alternate',
  },
  loaderBar: {
    marginTop: '20px',
    width: '150px',
    height: '6px',
    background: 'rgba(0, 255, 0, 0.2)',
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
  },
  loaderBarInner: {
    position: 'absolute',
    height: '100%',
    width: '50%',
    background: '#00ff00',
    animation: 'moveBar 1s infinite ease-in-out',
  },
};

// ✨ Injecting Keyframes manually
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes glow {
  from {
    text-shadow: 0 0 5px #00ff00;
  }
  to {
    text-shadow: 0 0 20px #00ff00, 0 0 40px #00ff00;
  }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes moveBar {
  0% { left: -50%; }
  50% { left: 25%; }
  100% { left: 100%; }
}
`, styleSheet.cssRules.length);

export default App;
