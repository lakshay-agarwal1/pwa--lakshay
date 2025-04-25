import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBDDk5__zIRszvWg4Q3oetGfiRRIaIm9Do",
    authDomain: "pwa-app-6b055.firebaseapp.com",
    projectId: "pwa-app-6b055",
    storageBucket: "pwa-app-6b055.firebasestorage.app",
    messagingSenderId: "803641290491",
    appId: "1:803641290491:web:75a8b1d2e7e2cac0964a5e",
    measurementId: "G-VWWVPGTWSM",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// VAPID KEY from env
const VAPID_KEY =
    "BI5GjozZKCW82sRk2Bv-jTdRWr4J2Ub9CETxQFnzBzSiS2tGt8LMegB8HrRcLnTVU8WdDcCWq2yfJCjpG2B5J84";

// Request permission and get FCM token
export const NotificationPermission = async (): Promise<void> => {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.warn(
                " Notification permission was not granted by the user."
            );
            return;
        }

        const token = await getToken(messaging, { vapidKey: VAPID_KEY });

        if (token) {
            console.log("✅ Successfully obtained FCM token:", token);
            // TODO: Send this token to your backend if needed
        } else {
            console.warn(
                "⚠️ No FCM registration token available. Request permission to generate one."
            );
        }
    } catch (error) {
        console.error("❌ Failed to get FCM token:", error);
    }
};

// Foreground message listener with customized notification content and updated console logs
export const onFirebaseMessage = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("📩 Foreground message received:", payload);

            // Customize notification content here
            const notificationTitle = "🔥 New Alert from TrendHut!";
            const notificationOptions = {
                body: "You have a new notification. Check it out now!",
                icon: "/vite.svg", // Make sure vite.svg is in your public folder
                // You can add other options like badge, image, actions, etc.
            };

            if (Notification.permission === "granted") {
                new Notification(notificationTitle, notificationOptions);
                console.log("🔔 Displayed custom notification to the user.");
            } else {
                console.warn(
                    "⚠️ Notification permission not granted. Cannot display notification."
                );
            }

            resolve(payload);
        });
    });
