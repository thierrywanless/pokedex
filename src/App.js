import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Link to="/">
          <header className="text-4xl">Pokedex</header>
        </Link>
        <Switch>
          <Route path="/pokemon/:id" children={<Pokemon />} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
