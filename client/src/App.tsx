import './App.css';
import { ApolloProvider } from '@apollo/client';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import HomeView from './views/HomeView';
import SignUpView from './views/SignUpView';
import LoginView from './views/LoginView';
import AddJob from './views/AddJob';
import { client } from './services/api.service';
import { useAuth } from './store/auth-context';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeView />
              </ProtectedRoute>
            }
          />
          <Route path="/addJob" element={<AddJob />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  if (auth.loading) {
    console.log('loading');
    return <div>Loading...</div>;
  }
  if (!auth.currentUser) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};
