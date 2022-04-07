import './App.css';
import { ApolloProvider } from '@apollo/client';
import HomeView from './views/HomeView';
import { client } from './services/api.service';
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <HomeView />
      </div>
    </ApolloProvider>
  );
}

export default App;
