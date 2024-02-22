var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "User", 
    tableName: "users",
    columns: {
        userId: {
            primary: true,
            type: "int",
            generated: true,
        },
        clientId: {
            type: "varchar",
        },
        email: {
            type: "varchar",
        },
        password: {
            type: "varchar",
        },
        passwordRe: {
            type: "varchar",
        },
        grade: {
            type: "varchar",
        },
        createdAt: {
            type: "dateTime",
        },
        updatedAt: {
            type: "dateTime",
        },
    },
})