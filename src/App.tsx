import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ProfilesProvider } from "./contexts/ProfilesContext";
import HomePage from "./pages/HomePage";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <ProfilesProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:id" element={<ProfileDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ProfilesProvider>
  );
}

export default App;
