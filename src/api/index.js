import axios from 'axios'

// const HOST = 'http://10.12.10.215:8080/'
const HOST = 'http://183.129.154.130:3031/XPCore/'

export default {
  api_path () {
    return HOST
  },
  api_base (url, method = 'GET', params, success, failure) {
    axios({
      method: method,
      url: HOST + url,
      data: params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': sessionStorage.getItem('token')
      }
      // withCredentials: true,
      // crossDomain: true
    }).then((response) => {
      if (success) {
        success(response)
      }
    }).catch((error) => {
      failure(error)
    })
  },
  api_upload (url, params, success, failure, progress, _i, _flag) {
    axios({
      method: 'POST',
      url: HOST + url,
      data: params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': sessionStorage.getItem('token')
      },
      onUploadProgress: function (progressEvent) {
        progress(progressEvent, _i, _flag)
      }
    }).then((response) => {
      if (success) {
        success(response, _i, _flag)
      }
    }).catch((error) => {
      failure(error)
    })
  }
}
