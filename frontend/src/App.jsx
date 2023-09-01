import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import {
  NotFoundPage, LoginPage, ChatPage, SignupPage,
} from './pages';
import { Header } from './components';
import routes from './routes/routes.js';
import PrivateRoute from './routes/PrivateRoute.jsx';

const App = () => (
  <BrowserRouter>
    <div className="h-100 bg-light d-flex flex-column">
      <Header />
      <Container fluid="xl" className="h-100 my-4 rounded shadow overflow-hidden">
        <Routes>
          <Route
            path={routes.pages.chat()}
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
          <Route path={routes.pages.login()} element={<LoginPage />} />
          <Route path={routes.pages.signup()} element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </div>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
