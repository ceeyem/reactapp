import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";

// import css style
import "./App.css";

// import components
import AskQuestion from "./components/AskQuestion";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";

function App() {

    return (
        <Router>
            <div className="app" >
                <Routes>
                    <Route path="/" element={<AskQuestion />} />
                    <Route path="/question/:id" element={<AskQuestion />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<Dashboard />}
                    />
                </Routes>
                <Footer />
            </div>
        </Router>



    )
}

export default App;