import dotenv from 'dotenv'
dotenv.config();

const typeorm = require("typeorm")

const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    entities: [
        require("./entity/user.enttity.js"),
        require("./entity/resume.entity.js"),
        require("./entity/userInfos.entity.js")
    ],
})

dataSource.initialize();

module.exports = {
    dataSource,
}