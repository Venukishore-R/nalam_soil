import { useAuth } from "../lib/auth-context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";

function HomePage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeContent />
    </div>
  );
}

export default HomePage;
