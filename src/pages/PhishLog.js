import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const PhishLog = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const type = searchParams.get("type");

  useEffect(() => {
    const logClick = async () => {
      if (!email || !type) return;

      try {
        await addDoc(collection(db, "PhishingLogs"), {
          email: email,
          simulationType: type,
          clickedAt: new Date(),
        });
        console.log("✅ Logged phishing click for", email);
      } catch (error) {
        console.error("❌ Error logging phishing click:", error);
      }
    };

    logClick();
  }, [email, type]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ color: "red" }}>⚠️ This was a simulated phishing attack!</h1>
      <p>This was part of a cybersecurity training exercise. No real data was collected.</p>
    </div>
  );
};

export default PhishLog;
