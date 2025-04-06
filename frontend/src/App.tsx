import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './pages/products';
import Upload from './pages/upload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
