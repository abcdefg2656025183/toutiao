import request from "../utils/request";

export const loginApi = data => {
  return request.post('/v1_0/authorizations', data)
}

export const getUserChannels = () => {
  return request.get("/v1_0/user/channels");
};

export const getartListAPI = (id, time) => {
  return request.get("/v1_0/articles", {
    params: {
      channel_id: id,
      timestamp: time
    }
  });
};

export const dislikeArticleAPI = id => {
  return request.post("/v1_0/article/dislikes", {
    params: {
      target: id
    }
  });
};

export const reportArticleAPI = (target, type) => {
  return request.post("/v1_0/article/reports", {
    target,
    type
  });
};

export const getAllChannelAPI = () => {
  return request.get('/v1_0/channels')
}


export const updateUserChannelAPI = channels => {
  return request.put('/v1_0/user/channels', {
    channels
  })
}