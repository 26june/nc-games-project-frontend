import Header from "./Header";
import Nav from "./Nav";
import ReviewsList from "./ReviewsList";
import { Route, Routes } from "react-router-dom";
import Review from "./Review";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div>
      <Header className="Header"></Header>
      <Nav setSelectedCategory={setSelectedCategory}></Nav>
      <Routes>
        <Route
          path="/*"
          element={
            <ReviewsList selectedCategory={selectedCategory}></ReviewsList>
          }
        ></Route>

        <Route path="/reviews/:review_id/*" element={<Review></Review>}></Route>
      </Routes>
    </div>
  );
}
