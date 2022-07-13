import './scss/app.scss'

import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import FullPizza from "./pages/FullPizza/FullPizza";

function App() {

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/pizza/:id' element={<FullPizza/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
