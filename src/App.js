import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import Home from "./pages/Home";
import Pokemon from "./pages/AboutPokemon";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="h-auto min-h-screen bg-gray-600">
          <Link to="/" className="text-white hover:text-gray-500">
            <header className="flex p-4 justify-center content-center bg-red-500">
              <h1 className="text-4xl">Pokedex</h1>
            </header>
          </Link>
          <Switch>
            <Route path="/pokemon/:id" children={<Pokemon />} />
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
