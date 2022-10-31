import { Route, Routes } from "react-router-dom";
import MainPage from "../containers/MainPage";
import Form from "../containers/Form";
import EditUser from "../containers/EditUser";
import Register from "../containers/Registrtion"
import Login from "../containers/Login"

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="Form" element={<Form />} />
        <Route path="Register" element={<Register />} />
        <Route path="EditUser/:id" element={<EditUser />} />
      </Routes>
    </>
  );
}
