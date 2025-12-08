import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Home from './components/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import {useDispatch,useSelector} from 'react-redux';


function App() {
  const email=useSelector((state)=>state.users.user.email);
  return (
    <Container fluid>
      <Router>
        <Row>
          {email?<Header/>:null}
        </Row>
        <Row>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Row>
        <Row>
            <Footer/>
        </Row>
      </Router>
    </Container>
  );
}

export default App;
