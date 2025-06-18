import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase'; // ✅ Ensure correct path
import { useAuth } from '../../utils/authProvider';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const GoogleAuthButton = ({ text }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      login(token);
      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
      alert("Google sign-in failed. Please try again.");
    }
  };

  return (
    <button 
      className="flex gap-2 items-center justify-center rounded-lg border-violet-400 border w-full py-3 hover:bg-violet-500 transition"
      onClick={handleGoogleSignIn}
    >
      <FontAwesomeIcon icon={faGoogle} className="h-4 w-4 text-white" />
      <p className="text-sm text-white">{text}</p>
    </button>
  );
};

export default GoogleAuthButton;
