const axios = require('axios');
const cookie = require('js-cookie');
function Ajax(method,url,data){;
  return axios({
    method,
    url,
    data:method == 'get'?'':data,
    params:method == 'get'?data:'',
    headers:{
      authorized:cookie.get('token')
    }
  })
}
export {Ajax}
