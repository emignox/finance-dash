import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/charts";
import News from "./components/news";
import Stock from "./components/stockList";
import Nav from "./components/nav/nav";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/charts" element={<Home />} />
          <Route path="/" element={<News />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
