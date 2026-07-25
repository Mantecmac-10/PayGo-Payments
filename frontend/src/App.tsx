import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "../src/pages/signup";
import { Signin } from "./pages/signin";
import { SearchUsers } from "./pages/searchUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/search" element={<SearchUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
