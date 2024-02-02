import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SpecifcRecipePage from "./SpecificRecipePage";
import SearchPage from "./SearchPage";

import '../App.css';

function Pages() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/recipes/:id" element={<SpecifcRecipePage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Pages