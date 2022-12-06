import Header from "./Header";
import Nav from "./Nav";
import ReviewsList from "./ReviewsList";
import { Route, Routes } from "react-router-dom";
import Review from "./Review";

export default function Home() {
  return (
    <div>
      <Header className="Header"></Header>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<ReviewsList></ReviewsList>}></Route>
        <Route path="/reviews/:review_id/*" element={<Review></Review>}></Route>
      </Routes>
    </div>
  );
}
