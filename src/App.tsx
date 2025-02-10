import { Routes, Route } from "react-router-dom";

import { Layout } from "./view/layout/Layout";
import { Main } from "./view/pages/Main";
import { Caught } from "./view/pages/Caught";
import { Notfound } from "./view/pages/Notfound";
import { PokemonDetail } from "./view/pages/PokemonDetail/PokemonDetail"

function App() {
  
  return (
    <> 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="caught" element={<Caught />} />
          <Route path="pokemon/:identifier" element={<PokemonDetail />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;