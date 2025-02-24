import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate required environment variables
const validateEnvVariables = () => {
  const required = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID'
  ];

  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Validate before proceeding
validateEnvVariables();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || null // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services with error handling
const initializeService = (name, initFn) => {
  try {
    return initFn();
  } catch (error) {
    console.error(`Failed to initialize ${name}:`, error);
    return null;
  }
};

// Initialize services safely
export const analytics = initializeService('analytics', () => getAnalytics(app));
export const auth = initializeService('auth', () => getAuth(app));
export const db = initializeService('firestore', () => getFirestore(app));
export const storage = initializeService('storage', () => getStorage(app));
export const functions = initializeService('functions', () => getFunctions(app));

// Safe parsing of host:port string
const parseHostPort = (value, defaultPort) => {
  if (!value) return null;
  
  const parts = value.split(':');
  return {
    host: parts[0] || 'localhost',
    port: parseInt(parts[1], 10) || defaultPort
  };
};

// Development environment configurations
if (process.env.NODE_ENV === "development") {
  // Disable app verification for testing (phone auth)
  if (auth) {
    auth.settings.appVerificationDisabledForTesting = true;
  }
  
  // Connect to local emulators if enabled
  if (process.env.REACT_APP_USE_FIREBASE_EMULATORS === "true") {
    try {
      // Auth emulator
      const authUrl = process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_URL || 'http://localhost:9099';
      if (auth) {
        connectAuthEmulator(auth, authUrl);
        console.log('Connected to Auth emulator:', authUrl);
      }

      // Firestore emulator
      const firestoreConfig = parseHostPort(process.env.REACT_APP_FIREBASE_FIRESTORE_EMULATOR_HOST, 8080);
      if (db && firestoreConfig) {
        connectFirestoreEmulator(db, firestoreConfig.host, firestoreConfig.port);
        console.log(`Connected to Firestore emulator: ${firestoreConfig.host}:${firestoreConfig.port}`);
      }

      // Functions emulator
      const functionsConfig = parseHostPort(process.env.REACT_APP_FIREBASE_FUNCTIONS_EMULATOR_HOST, 5001);
      if (functions && functionsConfig) {
        connectFunctionsEmulator(functions, functionsConfig.host, functionsConfig.port);
        console.log(`Connected to Functions emulator: ${functionsConfig.host}:${functionsConfig.port}`);
      }

      // Storage emulator
      const storageConfig = parseHostPort(process.env.REACT_APP_FIREBASE_STORAGE_EMULATOR_HOST, 9199);
      if (storage && storageConfig) {
        connectStorageEmulator(storage, storageConfig.host, storageConfig.port);
        console.log(`Connected to Storage emulator: ${storageConfig.host}:${storageConfig.port}`);
      }

    } catch (error) {
      console.error("Failed to connect to emulators:", error);
    }
  }
}

export default app;