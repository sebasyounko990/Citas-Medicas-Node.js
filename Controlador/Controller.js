const Connection = require('../Conexion/Conexion');  //ACA REQUERIMOS LA CONEXION DE BASE DE DATOS PARA LAS CONSULTAS
const cnn = Connection();  //ACA POR MEDIO DE LA CONSTANTE CNN VAMOS A CONTENER LA CONEXION A LA BD
const { render } = require('ejs'); //ACA RENDERISAMOS LOS EJS PARA LA HORA DE HACER RENDERS LOS TOME CORRECTAMENTE
const bcryptjs = require('bcryptjs'); //LLAMAMOS EL MODULO DE INCRIPTACION DE CLAVES ANTERIORMENTE INSTALADO
const Controller = {}; //HACEMOS INICIALIZAMOS EL CONTROLADOR 


// INICIO PAGINA PRINCIPAL CERRAR Y LOGEO //
Controller.index = (req, res, next) => {
    res.render('pagina web')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
Controller.Cerrar = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}
Controller.login = (req, res, next) => {
    res.render('login')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
// FINAL PAGINA PRINCIPAL CERRAR Y LOGEO //


// INICIO DE VISTAS PARA CADA ROL //
Controller.paci = (req, res, next) => {
    res.render('VistaPaciente')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
Controller.med = (req, res, next) => {
    res.render('VistaMedico')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
Controller.admi = (req, res, next) => {
    res.render('VistaAdmin')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
// FIN DE VISTAS PARA CADA ROL //



// inicio de registro de cada rol //
Controller.registro = (req, res, next) => {
    res.render('registro')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
Controller.registroMedico = (req, res, next) => {
    res.render('registroMedico')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
Controller.registroAdmin = (req, res, next) => {
    res.render('registroAdmin')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
// fin de  registro de cada rol //


// INICIO DE VISTAS PARA CADA ROL //

Controller.DatosPaciente = (req, res, next) => {
    res.render('DatosPaciente')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
Controller.agenCita = (req, res, next) => {
    res.render('AgendarCita')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
Controller.VerCita = (req, res, next) => {
    res.render('VerCitas')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
// FIN DE VISTAS PARA CADA ROL //



//------------------- SECCION DE REGISTRO A CADA ROL Y LOGEO------------------- //

// INGRESO DE PACIENTE //
Controller.insertar = async (req, res, next) => {
    const nu = req.body.Numdoc;
    const n = req.body.Nombre;
    const a = req.body.Apellido;
    const t = req.body.Tipo;
    const tel = req.body.Numero;
    const co = req.body.Correo;
    const ro = req.body.Rol;
    const usu = req.body.Usu;
    const cla = req.body.Cla;
    let c = await bcryptjs.hash(cla, 5);
    cnn.query('INSERT INTO datospersonales SET?', { datnumeroid: nu, datnombre:n,  datapellido: a, datipoid: t, datelefono: tel, datcorreo: co, tipo_rol:ro, usulogin: usu, usupassword: c }, (err, results) => {
        if (err) {
            next(new Error(err));
        } else {
            res.render('login')
        }
    });
}

// INGRESO DE MEDICO //
Controller.insertarMe = async (req, res, next) => {  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
    const nu = req.body.Numdoc;
    const n = req.body.Nombre;
    const a = req.body.Apellido;
    const t = req.body.Tipo;
    const tel = req.body.Numero;
    const co = req.body.Correo;
    const ro = req.body.Rol;
    const usu = req.body.Usu;
    const cla = req.body.Cla;
    const con = req.body.Con;
    let c = await bcryptjs.hash(cla, 5);

    cnn.query('INSERT INTO datospersonales SET?', { datnumeroid: nu, datnombre:n,  datapellido: a, datipoid: t, datelefono: tel, datcorreo: co, tipo_rol:ro, usulogin: usu, usupassword: c, num_consultorio:con }, (err, results) => {
        if (err) {
            next(new Error(err));
        } else {
            res.render('login')
        }
    });
}

// INGRESO DE ADMIN //
Controller.insertarAd = async (req, res, next) => {  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
    const nu = req.body.Numdoc;
    const a = req.body.Apellido;
    const t = req.body.Tipo;
    const tel = req.body.Numero;
    const co = req.body.Correo;
    const usu = req.body.Usu;
    const cla = req.body.Cla;
    let c = await bcryptjs.hash(cla, 8);

    cnn.query('INSERT INTO datospersonales SET?', { datnumeroid: nu, datapellido: a, datipoid: t, datelefono: tel, datcorreo: co, usulogin: usu, usupassword: c }, (err, results) => {
        if (err) {
            next(new Error(err));
        } else {
            cnn.query('INSERT INTO usuario_rol SET?', { rolid: 3, datnumeroid: nu }, (err, resbd) => {
            });
        }
    });
    res.render('login')
}

// INICIO DE SESION PARA TODOS LOS ROLES //
Controller.loginentrar = async (req, res, next) => {  //LOGINN 
    const usu = req.body.Usuario;  // TRAEMOS LOS NAME DE EL LOGIN PARA VALIDAR LOS CAMPOS
    const cla = await req.body.Password;

    console.log(usu + cla);

    cnn.query('SELECT * FROM datospersonales WHERE usulogin=?', [usu], async (err, results) => {  //CONSULTAMOS LOS DATOS EN LA BASE DE DATOS Y REEMPLAZAMOS VALORES CON LOS QUE DILIGENCIA EL USUARIO
        if (err) {
            next(new Error("ERROR AL REALIZAR LA CONSULTA", err)); //VALIDAMOS SI EXITEN ERRORES

        } else if (results != 0 && await (bcryptjs.compare(cla, results[0].usupassword))) { // SI EL RESULTADO ES DIFERENTE DE 0 ES QUE ENCONTRO EL USUARIO,POR MEDIO DE UN ARREGLO Y COMPARE, COMPARAMOS LO DILIGENCIADO POR EL USUARIO Y LO REGISTRADO EN LA BD                           console.log("Datos Correctossssssss");


            datnumeroid = results[0].datnumeroid;
            // ident = results.datnumeroid;


            cnn.query('SELECT * FROM datospersonales WHERE datnumeroid=?', [datnumeroid], async (err, results) => {
                rol = results[0].tipo_rol;

                console.log(rol)


                //CREAMOS SESIONES POR MEDIO DE UN ARREGLO, QUE NOS RETORNA LOS DATOS DE EL USUARIO LOGEADO
                req.session.Login = true; //GENERAMOS LA SESION AL DARLE COMO TRUE EN VERDADERA.
                switch (rol) {
                    case "Paciente":
                        // VISTA PACIENTE //


                        cnn.query('SELECT * FROM datospersonales WHERE datnumeroid=?', [datnumeroid], async (err, results) => { //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                            if (err) { //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                                next(new Error(err));
                                console.log("ERROR EN LA CONSULTA");
                            }
                            else {
                                nombre = results[0].usulogin;
                                apellido = results[0].datapellido;
                                datid = results[0].datid;
                                datnumeroid = results[0].datnumeroid;

                                console.log(nombre + apellido)

                                res.redirect('VistaPaciente')
                            }
                        })

                        break; //DESCANSA


                    //VALIDAMOS IGUAL QUE ARRIBA 
                    case "Medico":
                        cnn.query('SELECT * FROM datospersonales WHERE datnumeroid=?', [datnumeroid], async (err, results) => { //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                            if (err) { //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                                next(new Error(err));
                                console.log("ERROR EN LA CONSULTA");
                            }
                            else {
                                nombre = results[0].usulogin;
                                apellido = results[0].datapellido;
                                datid = results[0].datid;
                                datnumeroid = results[0].datnumeroid;
                                console.log(nombre + apellido)

                                res.redirect('VistaMedico')

                            }
                        })
                        break;

                    case "Admin":
                        cnn.query('SELECT * FROM datospersonales WHERE datnumeroid=?', [datnumeroid], async (err, results) => { //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                            if (err) { //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                                next(new Error(err));
                                console.log("ERROR EN LA CONSULTA");
                            }
                            else {
                                nombre = results[0].usulogin;
                                apellido = results[0].datapellido;
                                datid = results[0].datid;
                                console.log(nombre + apellido)



                                res.redirect('VistaAdmin')

                            }
                        })


                        break;
                }
            })





        }
        else {
            console.log("DATOS INCORRECTOS POR PENDEJO ESCRIBA LAS CLAVES BIEN"); //SALIMOS DEL IF DE ENTRADA Y SWITCH A UN VALIDADOR SI LOS DATOS SON INCORRECTOS 
            res.render('Login', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "VERIFIQUE SU USUARIO O CONTRASEÑA.",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: '/'
            });//NOS REDIRIGE AL MISMO ARCHIVO
        }
    })




}
// FIN DE SESION PARA TODOS LOS ROLES //


//------------------- SECCION DE REGISTRO A CADA ROL Y LOGEO ------------------- //






// INICIO DE FUNCIONES PACIENTE //

Controller.DatosPaciente = (req, res, next) => {
    //creamos una consulta de usuarios por medio de la funcion flecha
    cnn.query('SELECT * FROM datospersonales WHERE datnumeroid="' + datnumeroid + '"', (err, resbd) => {  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
        if (err) { //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
            next(new Error(err));
            console.log("ERROR EN LA CONSULTA");
        }
        else {

            console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
            res.render('DatosPaciente', { Datos: resbd });  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
        }
    })

}
Controller.actualizar = async (req, res, next) => {
    const n = req.body.nn;
    const a = req.body.aa;
    const t = req.body.tt;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
    const c = req.body.cc;
    const u = req.body.uu;
    const cl = req.body.cll;
    const cla = await bcryptjs.hash(cl, 5);

    cnn.query('UPDATE datospersonales SET datnombre="' + n + '", datapellido="' + a + '",datelefono="' + t + '",datcorreo="' + c + '", usulogin="' + u +'", usupassword="' + cla +'"  WHERE datnumeroid="' + datnumeroid + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        } else {
            res.redirect('DatosPaciente');
        }
    })
}
Controller.insertarCita_Paciente = async (req, res, next) => {  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
    const id = req.body.Identificacion;
    const es = req.body.Especialidad;
    const fec_cit = req.body.Fecha_Cita;
    const lug_cit = req.body.Lugar_Cita;
    const cons = req.body.Consultorio;


    console.log(id + es + fec_cit + lug_cit + cons);
    cnn.query('INSERT INTO cita SET?', { datnumeroid: id, especialidad: es, fecha_cita: fec_cit, lugar_cita: lug_cit, consultorio: cons }, (err) => {
        if (err) {
            throw err
        }
        else {
            res.render('AgendarCita')
        }
    })
}
Controller.VerCita = (req, res, next) => {
    cnn.query('SELECT C.especialidad,C.fecha_cita,C.lugar_cita,C.consultorio FROM cita C ORDER BY  C.fecha_cita  DESC', (err, resbd) => {  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
        if (err) { //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
            next(new Error(err));
            console.log("ERROR EN LA CONSULTA");
        }
        else {

            console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
            res.render('VerCitas', { Datos: resbd });  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
        }
    })
}

// FINAL DE FUNCIONES PACIENTE //










// INICIO DE VISTAS PARA CADA MEDICO //

Controller.Pacientes_regis = (req, res, next) => {
    res.render('Pacientes-registrados')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
Controller.agenCitaMed = (req, res, next) => {
    res.render('AgendarCitaMedico')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
Controller.DatosMedico = (req, res, next) => {
    res.render('DatosMedico')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
Controller.VerCitaMedi = (req, res, next) => {
    res.render('VerCitasMedico')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
}
// FIN DE VISTAS PARA CADA MEDICO //




// INICIO DE FUNCIONES MEDICO //
Controller.Pacientes_regis = (req, res, next) => {
    //creamos una consulta de usuarios por medio de la funcion flecha
    cnn.query('SELECT D.datnumeroid, D.datnombre, D.datapellido, D.datipoid, D.datelefono, D.datcorreo,D.tipo_rol FROM datospersonales D WHERE D.tipo_rol="Paciente"', (err, resbd) => {  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
        if (err) { //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
            next(new Error(err));
            console.log("ERROR EN LA CONSULTA");
        }
        else {

            console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
            res.render('Pacientes-registrados', { Datos: resbd });  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
        }
    })

}
Controller.insertarCita_Paciente_medico = async (req, res, next) => {  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
    const id = req.body.Identificacion;
    const es = req.body.Especialidad;
    const fec_cit = req.body.Fecha_Cita;
    const lug_cit = req.body.Lugar_Cita;
    const cons = req.body.Consultorio;

    console.log(id + es + fec_cit + lug_cit + cons);
    cnn.query('INSERT INTO cita SET?', { datnumeroid: id, especialidad: es, fecha_cita: fec_cit, lugar_cita: lug_cit, consultorio: cons }, (err) => {
        if (err) {
            throw err
        }
        else {
            res.render('AgendarCitaMedico')
        }
    })
}



Controller.DatosMedico = (req, res, next) => {
    //creamos una consulta de usuarios por medio de la funcion flecha
    cnn.query('SELECT * FROM datospersonales WHERE  datnumeroid="' + datnumeroid + '"', (err, resbd) => {  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
        if (err) { //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
            next(new Error(err));
            console.log("ERROR EN LA CONSULTA");
        }
        else {

            console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
            res.render('DatosMedico', { Datos: resbd });  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
        }
    })

}
Controller.actualizarr = async (req, res, next) => {
    const n = req.body.nn;
    const a = req.body.aa;
    const t = req.body.tt;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
    const c = req.body.cc;
    const u = req.body.uu;
    const cl = req.body.cll;
    const cla = await bcryptjs.hash(cl, 5);

    cnn.query('UPDATE datospersonales SET datnombre="' + n + '", datapellido="' + a + '",datelefono="' + t + '",datcorreo="' + c + '", usulogin="' + u +'", usupassword="' + cla +'"  WHERE datnumeroid="' + datnumeroid + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        } else {
            res.redirect('DatosMedico');
        }
    })
}

Controller.VerCitaMedi = (req, res, next) => {
    cnn.query('SELECT C.datnumeroid, C.id_cita, C.especialidad, C.fecha_cita, C.lugar_cita, C.consultorio FROM cita C , datospersonales D WHERE D.datnumeroid="' + datnumeroid + '" ORDER BY C.fecha_cita DESC LIMIT 100 ', (err, resbd) => {  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 

        if (err) { //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
            next(new Error(err));
            console.log("ERROR EN LA CONSULTA");
        }
        else {
            num_consultorio = resbd[0].num_consultorio;

            console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
            res.render('VerCitasMedico', { Datos: resbd });  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
        }
    })
}



// FINAL DE FUNCIONES MEDICO //










Controller.actualizarrol = async (req, res, next) => {
    cnn.query('UPDATE usuario_rol SET rolid="5" WHERE datnumeroid="' + datnumeroid + '"', async (err, respbb) => {
        if (err) {
            next(new Error(err));
        } else {
            res.send('Se Actualizo con existo');
        }
    })
}




module.exports = Controller;