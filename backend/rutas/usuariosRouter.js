import express from "express";
import { autenticarUsuario } from "../controladores/usuariosController.js";

const routerUsuarios = express.Router();

routerUsuarios.post("/autenticarUsuario",(req,res)=>{
    autenticarUsuario(req,res);
});

export{routerUsuarios}