const express=require('express');
const Controller = require('../Controlador/Controller');
const Rutas=express.Router();

//EN LOS CONST UTILIZAMOS Y LLAMAMOS LAS LIBRERIAS NECESARIAS

// INICIO PAGINA PRINCIPAL CERRAR Y LOGEO //
Rutas.get('/',Controller.index);
Rutas.get('/Cerrar',Controller.Cerrar);
Rutas.get('/login',Controller.login);
Rutas.post('/entrar',Controller.loginentrar);
// FINAL PAGINA PRINCIPAL CERRAR Y LOGEO //


// INICIO DE VISTAS PARA CADA ROL //
Rutas.get('/VistaPaciente',Controller.paci);
Rutas.get('/VistaMedico',Controller.med);
Rutas.get('/VistaAdmin',Controller.admi);
// FIN DE VISTAS PARA CADA ROL //

// inicio de registro de cada rol //
Rutas.get('/registro',Controller.registro);
Rutas.get('/registroMedico',Controller.registroMedico);
Rutas.get('/registroAdmin',Controller.registroAdmin);
// Metodos pos y get //
Rutas.post('/InsertUsu',Controller.insertar);
Rutas.post('/InsertMedico',Controller.insertarMe);
Rutas.post('/InsertAdmin',Controller.insertarAd);
// fin de  registro de cada rol //


// <----------------------------------------------------------> //

// INICIO DE VISTAS PARA LA CONSULTA DE DATOS DEL PACIENTE //
Rutas.get('/AgendarCita',Controller.agenCita);
Rutas.get('/DatosPaciente',Controller.DatosPaciente);
Rutas.get('/VerCitas',Controller.VerCita);
// FINAL DE VISTAS PARA LA CONSULTA DE DATOS DEL PACIENTE //


// INICIO FUNCIONES DEL PACIENTE //
Rutas.get('/DatosPaciente',Controller.DatosPaciente);
Rutas.post('/actuaPaciente',Controller.actualizar);
Rutas.post('/GenerarCita_paciente',Controller.insertarCita_Paciente);
Rutas.get('/Vercitas',Controller.VerCita);
// FINAL FUNCIONES DEL PACIENTE //

// <----------------------------------------------------------> //


// <----------------------------------------------------------> //

// INICIO DE VISTAS PARA LA CONSULTA DE DATOS DEL MEDICO //
Rutas.get('/Pacientes-registrados',Controller.Pacientes_regis);
Rutas.get('/DatosMedico',Controller.DatosMedico);
Rutas.get('/AgendarCitaMedico',Controller.agenCitaMed);
Rutas.get('/VerCitasMedico',Controller.VerCitaMedi);


// // FINAL DE VISTAS PARA LA CONSULTA DE DATOS DEL MEDICO //


// // INICIO DE FUNCIONES MEDICO //
Rutas.get('/DatosMedico',Controller.DatosMedico);
Rutas.post('/actuaMedico',Controller.actualizarr);
Rutas.post('/AgendarCita_Medico',Controller.insertarCita_Paciente_medico);
Rutas.get('/Pacientes-registrados',Controller.Pacientes_regis);
Rutas.get('/VercitasMedico',Controller.VerCitaMedi);
// Rutas.post('/BuscarFechaCita',Controller.BuscarCita);



// FINAL DE FUNCIONES MEDICO //

// <----------------------------------------------------------> //







Rutas.post('/actualizarrol',Controller.actualizarrol);





module.exports=Rutas;