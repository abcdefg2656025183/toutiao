import request from "@/utils/request.js";

// 获取文章详情的 API（形参中的 id 是文章的 id）
export const getArticleDetailAPI = id => {
  return request.get(`/v1_0/articles/${id}`);
};

export const followUserAPI = userId => {
  return request.post("/v1_0/user/followings", {
    target: userId
  });
};

// 取消关注用户的 API
export const unfollowUserAPI = userId => {
  return request.delete(`/v1_0/user/followings/${userId}`);
};

// 点赞的 API（形参中的 artId 是文章的 Id）
export const addLikeAPI = artId => {
  return request.post('/v1_0/article/likings', {
    target: artId
  })
}

// 取消点赞的 API（形参中的 artId 是文章的 Id）
export const delLikeAPI = artId => {
  return request.delete(`/v1_0/article/likings/${artId}`)
}

// 评论点赞的 API
export const addLikeCmtAPI = cmtId => {
  return request.post('/v1_0/comment/likings', {
    target: cmtId
  })
}

// 评论取消点赞的 API
export const delLikeCmtAPI = cmtId => {
  return request.delete(`/v1_0/comment/likings/${cmtId}`)
}

// 发表评论的 API（形参中的 artId 是文章的 id；content 是评论的内容）
export const pubCommentAPI = (artId, content) => {
  return request.post('/v1_0/comments', {
    target: artId,
    content
  })
}
