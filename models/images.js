const sequelize = require("../db")
const { Sequelize, Model } = require("sequelize")

class images extends Model{

}
const imageSchema = {
    title:{type:Sequelize.TEXT,allowNull:false},
    image_url: { type: Sequelize.TEXT ,allowNull:false },
    description: { type: Sequelize.TEXT },
    favourite:{type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    privacy:{ type: Sequelize.TEXT ,allowNull:false }

}
images.init(imageSchema, {
    sequelize, tableName: "posts"
})
module.exports = images