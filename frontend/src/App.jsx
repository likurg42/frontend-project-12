import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotFoundPage, LoginPage, ChatPage } from './pages/index.js';
// import Header from './components/Header.jsx';

const App = () => (
  <BrowserRouter>
    <div className="h-100 bg-light d-flex flex-column">
      {/* <Header /> */}
      <Container fluid="xl" className="h-100 my-4 overflow-hidden rounded shadow">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </div>

  </BrowserRouter>
);

export default App;
