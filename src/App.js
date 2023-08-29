import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Auth/Landing";
import Registration from "./components/Auth/Registration";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/registration' element={<Registration/>}/>
      </Routes>
    </Router>
  );
}

export default App;
