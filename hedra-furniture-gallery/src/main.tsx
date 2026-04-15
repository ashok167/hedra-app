if (window.location.hostname.includes("onrender.com")) {
  window.location.replace("https://www.edendek.com");
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
