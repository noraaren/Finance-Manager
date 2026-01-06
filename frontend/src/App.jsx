import { Routes, Route } from "react-router-dom";
import StartPage from "./startPage.jsx";
import MainPage from "./MainPage.jsx";
import LoginPage from "./loginPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/Start" element={<StartPage />} />
      <Route path="/MainPage" element={<MainPage />} />
    </Routes>
  );
}
