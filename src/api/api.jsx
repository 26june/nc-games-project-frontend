import axios from "axios";

const myApi = axios.create({
  baseURL: "https://strange-lime-buffalo.cyclic.app/api",
});

export const getUsers = () => {
  return myApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const getReviews = (category, sort_by = "votes", order = "desc") => {
  if (category === "All Categories") {
    category = "";
  }
  return myApi
    .get("/reviews", { params: { category, sort_by, order } })
    .then(({ data }) => {
      return data.reviews;
    });
};

export const getReviewsById = (review_id) => {
  return myApi.get(`/reviews/${review_id}`).then(({ data }) => {
    return data.review;
  });
};

export const pathcReviewsById = (review_id, voteToIncrement) => {
  const patchBody = {
    inc_votes: voteToIncrement,
  };
  return myApi.patch(`/reviews/${review_id}`, patchBody).then(({ data }) => {
    return data.review;
  });
};

export const getCommentsByReviewId = (review_id) => {
  return myApi.get(`/reviews/${review_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const postCommentsById = (review_id, username, body) => {
  const patchBody = { username, body };
  return myApi
    .post(`/reviews/${review_id}/comments`, patchBody)
    .then(({ data }) => {
      return data.comment;
    });
};

export const getCategories = () => {
  return myApi.get(`/categories`).then(({ data }) => {
    return data.categories;
  });
};

export const deleteCommentsById = (comment_id) => {
  return myApi.delete(`/comments/${comment_id}`);
};
