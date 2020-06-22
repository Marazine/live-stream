import axios from 'axios'



// create an axios instance

const service = axios.create({

    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url

    withCredentials: true, // send cookies when cross-domain requests

    timeout: 30000, // request timeout

    headers: {

        //'Content-Type': 'application/json; charset=utf-8'

        "Content-Type": "application/x-www-form-urlencoded"

    },

    transformRequest: [

        function (data) {

            let ret = "";

            for (let it in data) {

                ret +=

                    encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";

            }

            return ret;

        }

    ]

})



// request interceptor

service.interceptors.request.use(

    config => {

        // do something before request is sent

        return config

    },

    error => {

        // do something with request error

        console.log(error) // for debug

        return Promise.reject(error)

    }

)



// response interceptor

service.interceptors.response.use(

    response => {

        const res = response.data

        return res;

    },

    error => {

        console.log('err' + error) // for debug



        return Promise.reject(error)

    }

)

/**

 * 封装get方法

 * @param url

 * @param data

 * @returns {Promise}

 */



service.get = (url, data = {}) => {

    return new Promise((resolve, reject) => {

        const params = {

            url: url,

            methods: 'get',

            params: data

        }

        resolve(service(params));

    })

}





/**

 * 封装post请求

 * @param url

 * @param data

 * @returns {Promise}

 */



service.post = (url, data = {},config={}) => {

    return new Promise((resolve, reject) => {

        const params = {

            ...config,

            url: url,

            method: 'post',

            data,

            

        }

        resolve(service(params));

    })

}



/**

 * 封装patch请求

 * @param url

 * @param data

 * @returns {Promise}

 */



service.patch = (url, data = {}) => {

    return new Promise((resolve, reject) => {

        const params = {

            url: url,

            methods: 'patch',

            data: data

        }

        resolve(service(params));

    })

}



/**

 * 封装put请求

 * @param url

 * @param data

 * @returns {Promise}

 */

service.put = (url, data = {}) => {

    return new Promise((resolve, reject) => {

        const params = {

            url: url,

            methods: 'put',

            data

        }

        resolve(service(params));

    })

}

/**

 * 请求地址处理

 * @param {*} actionName action方法名称

 */

service.adornUrl = (actionName, who) => {

    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!

    //添加多ip提供接口代理

    var proxyApi = "";

    var url = '';

    var token = "?token=dXNlciUzRGxpdmVfdmlkZW8lMjZwd2QlM0RsaXZlX3ZpZGVvX2RhdGFfam9iMTAwMQ";

    if (who) {

        switch (who) {

            case "proxyLl":

                proxyApi = "/proxyLl";

                url = "webservice/live_video/index.jsp/v1/sys/";

                break;

            case "proxyZx":

                proxyApi = "/proxyZx";

                url = "webservice/live_video/index.jsp/v1/sys/";
                // url = "webservice/live_video/index.jsp/v1/sys/";

                break;      

            default:

                break;

        }

    }

    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!

    return (

        (process.env.NODE_ENV !== "production" ? proxyApi : '')  
        + url+ actionName + token

    );

}



export default service