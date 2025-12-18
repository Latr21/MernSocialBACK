import { useEffect, useState } from "react";
import { getMe } from "../api/userApi";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Vous devez être connecté pour voir votre profil.");
          setLoading(false);
          return;
        }

        const response = await getMe(token);
        setUser(response.data.user);
      } catch (err) {
        setError(err.message || "Impossible de récupérer le profil.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Chargement du profil...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!user) {
    return <p>Aucun utilisateur trouvé.</p>;
  }

  return (
    <div>
      <h1>Mon profil</h1>
      <p><strong>Username :</strong> {user.username}</p>
      <p><strong>Email :</strong> {user.email}</p>
      {user.bio && <p><strong>Bio :</strong> {user.bio}</p>}
    </div>
  );
}
