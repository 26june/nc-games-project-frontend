import axios from "axios";

const myApi = axios.create({
  baseURL: "https://strange-lime-buffalo.cyclic.app/api",
});

export const getUsers = () => {
  return myApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const getReviews = () => {
  return myApi.get("/reviews").then(({ data }) => {
    return data.reviews;
  });
};

export const getReviewsById = (review_id) => {
  return myApi.get(`/reviews/${review_id}`).then(({ data }) => {
    return data.review;
  });
};

export const getCommentsByReviewId = (review_id) => {
  return myApi.get(`/reviews/${review_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
