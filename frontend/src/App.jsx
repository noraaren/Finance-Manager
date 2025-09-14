import { Routes, Route } from "react-router-dom";
import StartPage from "./StartPage.jsx";
import MainPage from "./MainPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/MainPage" element={<MainPage />} />
    </Routes>
  );
}
