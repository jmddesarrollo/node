/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('usuarios', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        rol: {
            type: DataTypes.STRING(60),
            allowNull: false,
            defaultValue: 'ROLE_USER'
        },
        nombre: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING(60),
            allowNull: true
        },
        enabled: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '1'
        }
    }, {
        tableName: 'usuarios',
        timestamps: false
    });
};