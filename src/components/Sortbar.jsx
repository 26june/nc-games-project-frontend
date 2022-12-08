import React from "react";
import "../style/SortBar.css";

export default function Sortbar({ currentSearch, setCurrentSearch }) {
  const selection = {
    toSort: ["votes", "created_at", "comment_count"],
    order_by: ["desc", "asc"],
  };

  return (
    <div className="Sortbar">
      <div>
        <label htmlFor="toSort">Sort by</label>
        <select
          name="sortBy"
          id="sortBy"
          onChange={(event) => {
            currentSearch.set("sort_by", event.target.value);
            setCurrentSearch(currentSearch);
          }}
          value={
            currentSearch.get("sort_by")
              ? currentSearch.get("sort_by")
              : "votes"
          }
        >
          {selection.toSort.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="sortBy">Order:</label>
        <select
          name="sortBy"
          id="sortBy"
          onChange={(event) => {
            currentSearch.set("order_by", event.target.value);
            setCurrentSearch(currentSearch);
          }}
          value={
            currentSearch.get("order_by")
              ? currentSearch.get("order_by")
              : "desc"
          }
        >
          {selection.order_by.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
