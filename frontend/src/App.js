import "./App.scss";
import { Route, Routes } from "react-router-dom";
import CreditCardForm from "./components/CreditCardForm";
import CardsDisplay from "./components/CardsDisplay";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route exact path="/" element={<CardsDisplay />} />
                    <Route exact path="/create" element={<CreditCardForm />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
