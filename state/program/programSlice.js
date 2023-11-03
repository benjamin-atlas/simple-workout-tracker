import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, initializeAuth } from "firebase/auth";
import {
  getReactNativePersistence,
  ReactNativeAsyncStorage,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const programSlice = createSlice({
  name: "program",
  initialState: {
    value: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(populateProgramAsync.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = "idle";
      })
      .addCase(populateProgramAsync.pending, (state) => {
        state.status = "pending";
      });
  },
});

export const populateProgramAsync = createAsyncThunk(
  "program/populateProgramAsync",
  async () =>
    await new Promise((resolve, reject) => {
      const firebaseConfig = {
        apiKey: process.env.EXPO_PUBLIC_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
        databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_APP_ID,
        measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
      };

      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      });

      signInWithEmailAndPassword(
        auth,
        process.env.EXPO_PUBLIC_EMAIL,
        process.env.EXPO_PUBLIC_PASSWORD
      )
        .then(() => {
          onValue(
            ref(database, `program`),
            (snapshot) => {
              resolve(snapshot.val());
            },
            (err) => {
              console.log(`An error occured fetching the program: ${err}`);
              reject(err);
            }
          );
        })
        .catch((err) => {
          console.log(`An error occured signing in: ${err}`);
          reject(err);
        });
    })
);

export default programSlice.reducer;
