import Sequelize from "sequelize";
import {db} from "../database/conexion.js";

const usuario = db.define("usuarios", {
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    contrasena: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
   
});

export {usuario}