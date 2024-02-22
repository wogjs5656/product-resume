var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Resume", 
    tableName: "resume",
    columns: {
        resumeId: {
            primary: true,
            type: "int",
            generated: true,
        },
        userId: {
            type: "int",
        },
        resumeTitle: {
            type: "varchar",
        },
        resumeIntro: {
            type: "varchar",
        },
        resumeAuthor: {
            type: "varchar",
        },
        resumeStatus: {
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