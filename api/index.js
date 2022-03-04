import * as $ from "jquery"
function base(options) {
    const origin = "http://localhost:3422"
    if (options.url[0] == "/") {
        options.url = origin + options.url
    }
    if (options.method !== "GET" && options.headers['Content-Type'] === '') {
        options.headers['Content-Type'] = 'application/json'
        options.dataType = 'json'
    }
    if (!options.data) {
        options.data = {}
    }
    return new Promise( async function(resolve){
        $.ajax(options).done(function (resp) {
            // 不要从 resp.error 获取错误信息,而是 从 const [resp,err] = await some() 的 err 获取信息
            if (resp.error.code === 0) {
                resp.error = undefined
                resolve([resp, null])
            } else {
                const err = resp.error
                // 不要从 resp.error 获取错误信息,而是 const [resp,err] = await some()
                resp.error = undefined
                resolve([resp, err])
            }

        }).fail(function () {
            resolve([{}, {code:1,message:"网络错误"}])
        })
    })
}
async function eaxmpleNews(data) {
    return base({
        method: "GET",
        url: "/news",
        data: data,
    })
}
export {
    eaxmpleNews,
}