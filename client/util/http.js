import axios from 'axios'

const baseUrl = process.env.API_BASE || ''
// 我们首先判断是否有process.env.API_BASE，这样在客户端和服务端都能顺利调用到axios方法



// 然后就是封装axios，在这我们只封装get和post方法，其他的请求根据实际情况进行封装
export const get =(url, params)=>{
    // get请求一般只接受两个参数请求路径url和请求路径上的？后面的参数params
    return new Promise((resolve,reject) =>{
        // 因为我们的请求可能是异步请求，所以我们使用Promise
        const path = `${baseUrl}${url}`
        console.log(path)
        // 因为我们可能需要在服务器里面添加baseurl，所以我们在这对get请求的url进行一步操作
        axios.get(path,{
            params:params
            //    在这get请求可以接收一个完整的带有params的url也可以将url和params分开传入，get传递params的时候是作为一个对象的一项传入
            //    params的格式是一个对象格式params: {firstName: 'Fred',lastName: 'Flintstone'}
        })
            .then(res =>{
                const data = res.data
                // 我们先将我们想要的数据从res中拿到，这样方便后面的操作
                if(data && data.success === true){
                    resolve(data)
                    // 如果成功拿到了数据，那么我们使用resolve将数据作为get方法的最后结果返回。
                }else {
                    reject(data)
                    // 如果我们拿到了api返回的结果，但是没有获取到我们想要的数据，那么也将这个结果作为get方法的最后结果返回
                }
            })
            // .catch(err=>{
            //     if(err.response){
            //         reject(err.response.data)
            //     }else {
            //         reject({
            //             success:false,
            //             err_msg:err.message
            //         })
            //     }
            // })
            // 如果我们没有获取到api返回的数据，那么我们将根据错误情况返回对应的错误信息,
            // 我们还可使用更简单的方法，将所有错误信息都直接reject掉
            .catch(reject)
    })

}

export const post = (url,data)=>{
    new Promise((resolve,reject)=>{
        const path = `${baseUrl}${url}`
        axios.post(path,data)
        // post请求可以直接接受两个参数，path和data，而get请求的params必须作为一个对象的一项传入，
        // data的格式{firstName: 'Fred',lastName: 'Flintstone'}
            .then(res=>{
                const data = res.data
                if(data && data.success === true){
                    resolve(data)
                }else {
                    reject(data)
                }
            })
            .catch(reject)
    })
}

// 到这get和post请求我们就已经封装好了，然后就是在store中使用。
// 因为我们所有的数据都是通过store传递给页面的，这样我们可以很好的控制数据的流向
