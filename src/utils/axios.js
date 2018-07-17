import axios from 'axios'

//设置全局axios默认值
axios.defaults.timeout = 5000; //5000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//创建一个axios实例
const instance = axios.create({
  baseURL: 'http://localhost:3200'
});
instance.defaults.withCredentials = true
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;
const token = localStorage.getItem('authorization') || '';
//request拦截器
instance.interceptors.request.use(
  config => {
    //每次发送请求之前检测存有token,那么都要放在请求头发送给服务器
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
//respone拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => { //默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      if (error.response.status === 401) {
        console.log(error.response)
      }
    }
    return Promise.reject(error.response);
  }
);

export default instance;
