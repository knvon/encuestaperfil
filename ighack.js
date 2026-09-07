 // ==========================================
// FIREBASE
// ==========================================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push
}
from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


// ==========================================
// CONFIGURACIÓN DE FIREBASE
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyBs4d5yBNRtWomrxWT85X7ht2F0HwhovfM",
    authDomain: "ighack-31025.firebaseapp.com",
    databaseURL: "https://ighack-31025-default-rtdb.firebaseio.com",
    projectId: "ighack-31025",
    storageBucket: "ighack-31025.firebasestorage.app",
    messagingSenderId: "71966990216",
    appId: "1:71966990216:web:932902b79cf6776ce3643d"
};


// Iniciar Firebase
const app = initializeApp(firebaseConfig);

// Conectar Realtime Database
const database = getDatabase(app);


// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const loginForm =
    document.getElementById("loginForm");

const loginCard =
    document.getElementById("loginCard");

const surveyCard =
    document.getElementById("surveyCard");

const surveyForm =
    document.getElementById("surveyForm");

const resultado =
    document.getElementById("resultado");


// ==========================================
// VARIABLES
// ==========================================

let correoGuardado = "";


// ==========================================
// FORMULARIO DE ACCESO
// ==========================================

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const correo =
            document
            .getElementById("contacto")
            .value
            .trim()
            .toLowerCase();

        const clave =
            document
            .getElementById("passwordDemo")
            .value
            .trim();


        // Verificar correo
        if (correo === "") {

            alert("Escribe un correo.");

            return;
        }


        // Verificar contraseña
        if (clave === "") {

            alert("Escribe una contraseña.");

            return;
        }


        // Verificar Gmail
        if (!correo.endsWith("@gmail.com")) {

            alert(
                "Introduce un correo de Gmail.\n\n" +
                "Ejemplo: hola@gmail.com"
            );

            return;
        }


        // Ya NO existe ninguna restricción DEMO-
        correoGuardado = correo;


        // Ocultar acceso
        loginCard.style.display = "none";

        // Mostrar encuesta
        surveyCard.style.display = "block";

    }
);


// ==========================================
// FORMULARIO DE ENCUESTA
// ==========================================

surveyForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const p1 =
            document.getElementById("p1").value;

        const p2 =
            document.getElementById("p2").value;

        const p3 =
            document.getElementById("p3").value;


        if (!p1 || !p2 || !p3) {

            resultado.textContent =
                "Contesta las tres preguntas.";

            return;
        }


        try {

            // ==================================
            // GUARDAR EN FIREBASE
            // ==================================

            await push(
                ref(database, "encuestas"),
                {

                    correo: correoGuardado,

                    pregunta1: p1,

                    pregunta2: p2,

                    pregunta3: p3,

                    fecha:
                        new Date().toISOString(),

                    tipoRegistro:
                        "PRACTICA_ACADEMICA"

                }
            );


            resultado.textContent =
                "¡Encuesta enviada correctamente!";


            surveyForm.reset();

            surveyForm.style.display =
                "none";


            console.log(
                "Registro guardado correctamente."
            );

        }

        catch (error) {

            console.error(
                "Error Firebase:",
                error
            );

            resultado.textContent =
                "Error al enviar la encuesta.";

        }

    }
);
