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
} from './pages/index.js';
import { Header } from './components/index.js';
import routes from './routes/routes.js';
import PrivateRoute from './routes/PrivateRoute.jsx';

const App = () => (
  <BrowserRouter>
    <div className="h-100 bg-light d-flex flex-column">
      <Header />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
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
