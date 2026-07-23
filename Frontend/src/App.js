import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Login from "./Component/Login";
import NoteState from "./context/NoteState";
import Signup from "./Component/Signup";
import Alert from "./Component/Alert";

function App() {

const [alert, setAlert] = useState(null);

const showAlert = (message, type) => {
setAlert({
msg: message,
type: type
});


setTimeout(() => {
  setAlert(null);
}, 1500);


};

return ( <NoteState> <Router> <Navbar />


    <Alert alert={alert} />

    <Routes>
      <Route path="/" element={<Home showAlert={showAlert} />} />
      <Route path="/login" element={<Login showAlert={showAlert} />} />
      <Route path="/signup" element={<Signup showAlert={showAlert} />} />
    </Routes>
  </Router>
</NoteState>


);
}

export default App;

