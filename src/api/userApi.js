import request from '../utils/request'

export const loginApi = (data) => {
  return request.post('/v1_0/authorizations', data)
}
