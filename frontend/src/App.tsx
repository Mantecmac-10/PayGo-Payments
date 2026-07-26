import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "../src/pages/signup";
import { Signin } from "./pages/signin";
import { SearchUsers } from "./pages/searchUser";
import { Balance } from "./pages/balance";
import { Transfer } from "./pages/transfer";
import { UpdateUser } from "./pages/UpdateUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/search" element={<SearchUsers />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/update" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
