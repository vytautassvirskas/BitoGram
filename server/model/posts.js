import {DataTypes} from "sequelize"

const Posts = (sequelize)=>{
    const Schema = {
        caption: {
            type: DataTypes.STRING,
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }
    return sequelize.define("posts", Schema)
}

export default Posts