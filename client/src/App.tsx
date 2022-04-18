import './App.css';
import { ApolloProvider } from '@apollo/client';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import HomeView from './views/HomeView';
import SignUpView from './views/SignUpView';
import LoginView from './views/LoginView';
// import AuthContext from './store/auth-context';
import { client } from './services/api.service';
import { AuthContextProvider, useAuth } from './store/auth-context';
function App() {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/singup" element={<SignUpView />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <HomeView />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthContextProvider>
    </ApolloProvider>
  );
}

export default App;

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
