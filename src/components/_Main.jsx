import Header from "./Header";
import Nav from "./Nav";
import ReviewsList from "./ReviewsList";
import { Route, Routes } from "react-router-dom";
import Review from "./Review";
import { useState } from "react";
import { SelectedCategory } from "../context/SelectedCategory";
import CategorisedReview from "./CategorisedReview";

export default function Home() {
  // console.log(window.location.pathname);

  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <SelectedCategory.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      <div>
        <Header className="Header"></Header>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<ReviewsList></ReviewsList>}></Route>
          <Route
            path="/categories/:category"
            element={<CategorisedReview></CategorisedReview>}
          ></Route>

          <Route
            path="/reviews/:review_id/*"
            element={<Review></Review>}
          ></Route>
        </Routes>
      </div>
    </SelectedCategory.Provider>
  );
}
