import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotFoundPage, LoginPage, ChatPage } from './pages';

const App = () => (
  <BrowserRouter>
    <Container fluid="xl">
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;
