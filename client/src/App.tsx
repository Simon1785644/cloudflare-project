import './App.scss';
import './locales/i18n'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Product from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Event from './pages/Event';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchResults" element={<SearchResult />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event" element={<Event />} />          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
