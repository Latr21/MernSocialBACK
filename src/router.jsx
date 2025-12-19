import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
// import SignIn, SignUp, etc.

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* autres routes */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
