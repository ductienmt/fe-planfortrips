import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Plan from './pages/Plan/Plan';

function App() {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={< HomePage/>}/>
                    <Route path="/plan" element={< Plan/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
