import request from "../utils/request";

export const getUserChannels = () => {
  return request.get("/v1_0/user/channels");
};

export const getArtListAPI = () => {
  return request.get("/v1_0/articles", {
    params: {
      channel_id: id,
      timestamp: time
    }
  });
};
