import './App.css';
import { ApolloProvider } from '@apollo/client';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import HomeView from './views/HomeView';
import SignUpView from './views/SignUpView';
import LoginView from './views/LoginView';
import AddJob from './views/AddJob';
import { client } from './services/api.service';
import { useAuth } from './store/auth-context';
import NewJobs from './views/NewJobs';
import MyJobs from './views/MyJobs';
import MyListings from './views/MyListings';
import Messages from './views/Messages';
import SetupUser from './views/SetupUser';
import Account from './views/Account';

import AddDog from './views/AddDog';
import FullScreenLoadingIndicator from './components/FullScreenLoadingIndicator';
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home/newJobs" />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route path="/setupUser" element={<SetupUser />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeView />
              </ProtectedRoute>
            }
          >
            <Route path="/home/newJobs" element={<NewJobs />} />
            <Route path="/home/myJobs" element={<MyJobs />} />
            <Route path="/home/myListings" element={<MyListings />} />
            <Route path="/home/messages" element={<Messages />} />
          </Route>
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/addDog"
            element={
              <ProtectedRoute>
                <AddDog />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/addJob" element={<AddJob />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  console.log(auth.currentUser?.email, auth.currentMongoUser?.firstName, auth.loading);
  if (auth.loading) {
    return <FullScreenLoadingIndicator />;
  }
  if (!auth.currentUser) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};
