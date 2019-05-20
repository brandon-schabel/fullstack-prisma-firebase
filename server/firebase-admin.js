import admin from 'firebase-admin'

const serviceAccount = require('./firebase-admin-keys.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

console.log('Firebase Admin Initialized');

export default admin;