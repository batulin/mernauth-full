import sequelize from '../db.js'
import {DataTypes} from 'sequelize';

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
}, {
    timestamps: false
})

const RefreshToken = sequelize.define('refresh_token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
})

User.hasOne(RefreshToken)
RefreshToken.belongsTo(User)

export {
    User,
    RefreshToken
}
