import request from '../utils/request'
import axios from 'axios'
export const loginApi = (data) => {
  return request.post('/v1_0/authorizations', data)
}
export const exchangeTokenAPI = refreshToken => {
  return axios({
    method: 'PUT',
    // 这里必须填写完整的请求 URL 地址
    url: 'http://www.liulongbin.top:8000/v1_0/authorizations',
    headers: {
      // 在请求头中携带 Authorization 身份认证字段
      Authorization: 'Bearer ' + refreshToken
    }
  })
}