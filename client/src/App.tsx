import './App.css';
import { ApolloProvider } from '@apollo/client';
import HomeView from './views/HomeView';
import SignUpView from './views/SignUpView';
// import LoginView from './views/LoginView';
// import AuthContext from './store/auth-context';
import { client } from './services/api.service';
import { AuthContextProvider } from './store/auth-context';
function App() {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        {/* <LoginView /> */}

        <SignUpView />
        {/* <HomeView /> */}
      </AuthContextProvider>
    </ApolloProvider>
  );
}

export default App;
