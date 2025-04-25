importScripts(
    "https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js"
);
importScripts(
    "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
    apiKey: "AIzaSyBDDk5__zIRszvWg4Q3oetGfiRRIaIm9Do",
    authDomain: "pwa-app-6b055.firebaseapp.com",
    projectId: "pwa-app-6b055",
    storageBucket: "pwa-app-6b055.firebasestorage.app",
    messagingSenderId: "803641290491",
    appId: "1:803641290491:web:75a8b1d2e7e2cac0964a5e",
    measurementId: "G-VWWVPGTWSM",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/vite.svg",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
