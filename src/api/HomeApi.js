import request from "../utils/request";

export const getUserChannels = () => {
  return request.get("/v1_0/user/channels");
};
