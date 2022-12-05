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
