import {DataTypes} from "sequelize"

const Users = (sequelize)=>{
    const Schema = {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }
    return sequelize.define("users", Schema)
}

export default Users