import {DataTypes} from "sequelize"

const Likes = (sequelize)=>{
    const Schema = {
        like: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userName:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    return sequelize.define("likes", Schema)
}

export default Likes