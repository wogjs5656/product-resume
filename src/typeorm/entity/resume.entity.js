var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "UserInfos", 
    tableName: "userInfos",
    columns: {
        userInfoId: {
            primary: true,
            type: "int",
            generated: true,
        },
        userId: {
            type: "int",
        },
        name: {
            type: "varchar",
        },
        age: {
            type: "int",
        },
        gender: {
            type: "varchar",
        },
        createdAt: {
            type: "dateTime",
        },
        updatedAt: {
            type: "dateTime",
        },
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            joinColumn: { name: 'userId'},
            cascade: true,
        }
    }
})