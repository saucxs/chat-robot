const baseApi = 'api/chat'
const db = {
    host: '127.0.0.1', // 数据库IP
    port: 3306, // 数据库端口
    database: 'chat_robot', // 数据库名称
    user: 'root', // 数据库用户名
    password: '123456', // 数据库密码,
    salt: 'chat_robot'
}

const mailer = {
    host:"smtp.qq.com",
    port: 465,
    domains:'["qq.com"]',
    account:'184866445@qq.com',
    pass: "",
    from: "happy-chat<184866445@qq.com>",
    route_on: true,
    encoding: "utf-8"
}

const secret = 'happy-chat-sec'

module.exports = {
    db,
    mailer,
	baseApi,
	secret
}
