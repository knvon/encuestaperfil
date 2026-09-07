// ==========================================
// FIREBASE
// ==========================================

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push
} from
"https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


// ==========================================
// CONFIGURACIÓN FIREBASE
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


const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


// ==========================================
// ELEMENTOS
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


let contactoDemo = "";


// ==========================================
// ACCESO DEMOSTRACIÓN
// ==========================================

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const contacto =
            document
            .getElementById("contacto")
            .value
            .trim();

        const passwordDemo =
            document
            .getElementById("passwordDemo")
            .value;


        if (contacto === "") {

            alert(
                "Escribe un correo o teléfono ficticio."
            );

            return;
        }


        if (passwordDemo === "") {

            alert(
                "Escribe una contraseña."
            );

            return;
        }


        // ==================================
        // IDENTIFICAR CORREO O TELÉFONO
        // ==================================

        const esCorreo =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto);

        const esTelefono =
            /^[0-9+\-\s]{7,15}$/.test(contacto);


        if (!esCorreo && !esTelefono) {

            alert(
                "Escribe un correo o teléfono válido."
            );

            return;
        }


        // Solo guardamos el correo o teléfono
        contactoDemo = contacto;


        /*
            IMPORTANTE:

            La contraseña de demostración
            NO se guarda en Firebase.

            NO se envía.

            NO se almacena.

            Solo se utiliza para simular
            la pantalla de acceso.
        */


        console.log(
            "Contacto demo:",
            contactoDemo
        );


        loginCard.style.display =
            "none";

        surveyCard.style.display =
            "block";
    }
);


// ==========================================
// ENCUESTA
// ==========================================

surveyForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const p1 =
            document
            .getElementById("p1")
            .value;

        const p2 =
            document
            .getElementById("p2")
            .value;

        const p3 =
            document
            .getElementById("p3")
            .value;


        if (!p1 || !p2 || !p3) {

            resultado.textContent =
                "Contesta las tres preguntas.";

            return;
        }


        try {

            // Detectar tipo de contacto
            const tipoContacto =
                contactoDemo.includes("@")
                ? "correo"
                : "telefono";


            // GUARDAR EN FIREBASE
            await push(
                ref(database, "encuestas"),
                {

                    contacto:
                        contactoDemo,

                    tipo:
                        tipoContacto,

                    pregunta1:
                        p1,

                    pregunta2:
                        p2,

                    pregunta3:
                        p3,

                    fecha:
                        new Date()
                        .toISOString()

                }
            );


            resultado.textContent =
                "¡Encuesta enviada correctamente!";


            surveyForm.reset();

            surveyForm.style.display =
                "none";


        } catch (error) {

            console.error(
                "Error Firebase:",
                error
            );

            resultado.textContent =
                "Error al enviar la encuesta.";
        }
    }
);