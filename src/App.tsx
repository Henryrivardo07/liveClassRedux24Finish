import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import styles from './Components/Styles/Navbar.module.scss';
import CartPage from './Pages/CartPage';

const App = () => {
  return (
    <Router>
      <nav className={styles.navbar}>
        <Link to='/'>Home</Link>
        <Link to='/cart'>Cart</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </Router>
  );
};

export default App;
