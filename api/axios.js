                                 //axios的二次封装
import axios from "axios"
import config from "../config/index"

//判断当前是生产环境还是开发环境
const baseUrl = process.env.MODE_ENV === "development" ? config.baseUrl.dev : config.baseUrl.pro

//工具类
class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    } 

    //定义axios的相关配置
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            Header: {}
        }
        return config
    }

    //拦截器
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            console.log(response,"response");
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response;
        }, function (error) {
            console.log(error,"error");
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    //调用的接口请求
    request(options) {
        const instance = axios.create()
        options = { ...this.getInsideConfig(), ...options }
        this.interceptors(instance)
        return instance(options)
    }
}
export default new HttpRequest(baseUrl)