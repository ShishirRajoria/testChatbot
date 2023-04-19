import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserForm from "./Components/UserForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
