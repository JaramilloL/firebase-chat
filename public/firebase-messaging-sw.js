// //vamos a trabajara con importScript para modulos de workets
// importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js"); //-compat
// importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-app-messaging.js"); //-compat

// // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from 'firebase/firestore'
// // import { getMessaging } from 'firebase/messaging'

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGINSENDER_ID ,
//   appId: import.meta.env.VITE_APP_ID ,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID
// };

// // Initialize Firebase
// const app = firebaseConfig.initializeApp(firebaseConfig);
// // export const analytics = getAnalytics(app);
// //creamos una contante para la authenticacion
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const ms = firebaseConfig.messaging(app);