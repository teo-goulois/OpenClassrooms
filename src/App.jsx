import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './styles/global.scss'
// Pages
import Home from './pages/Home'
import Apartment from './pages/Apartment'
import About from './pages/About'
import Error from './pages/Error'
// Components
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apartment" element={<Apartment />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
