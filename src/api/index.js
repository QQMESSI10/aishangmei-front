import axios from "axios"; //引入
import { Message } from "element-ui";
import { getToken } from "../utils/user.js";
let baseURL = "http://localhost:8888/admin";

let config = {
  baseURL: baseURL,
  timeout: 30000, //设置最大请求时间
};
const _axios = axios.create(config);

_axios.defaults.headers.common["token"] = getToken();

/* 请求拦截器（请求之前的操作） */
_axios.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = getToken;  //添加token,需要结合自己的实际情况添加，
    return config;
  },
  (err) => Promise.reject(err)
);

/* 请求之后的操作 */
_axios.interceptors.response.use(
  (res) => {
    //   if (res.data.code === 401 ) {
    //       Toast("无权限操作")
    //   }
    // if (res.data.code === 400 ) {
    //     Toast("请求网络失败")
    // }
    // if (res.data.code === 404 ) {
    //    Toast("请求网络失败")
    // }
    if (res.data.messageCode != "200") {
      Message.error(res.data.message);
    }
    return res;
  },
  (err) => {
    if (err) {
      Message.error("未知原因错误");
    }
    return Promise.reject(err);
  }
);

//封装post,get方法
const api = {
  get(url = "", params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        params,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        method: "GET",
      })
        .then((res) => {
          resolve(res.data);
          return res;
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post(url = "", params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        data: params,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        method: "POST",
      })
        .then((res) => {
          resolve(res.data);
          return res;
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default api;