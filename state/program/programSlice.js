import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initializeFirebase, database } from "../../firebase";
import { onValue, ref, set } from "firebase/database";
import deepCopy from "../../utils/deepCopy";

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
      })
      .addCase(updateExerciseAsync.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = "idle";
      })
      .addCase(updateExerciseAsync.pending, (state) => {
        state.status = "pending";
      });
  },
});

export const populateProgramAsync = createAsyncThunk(
  "program/populateProgramAsync",
  async () =>
    await new Promise((resolve, reject) => {
      initializeFirebase()
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

export const updateExerciseAsync = createAsyncThunk(
  "program/updateExerciseAsync",
  async (
    { phaseIndex, weekIndex, dayIndex, exerciseIndex, newExerciseValues },
    { getState }
  ) => {
    await set(
      ref(
        database,
        `program/${phaseIndex}/weeks/${weekIndex}/days/${dayIndex}/exercises/${exerciseIndex}`
      ),
      newExerciseValues
    );

    const newProgram = deepCopy(getState().program.value);
    newProgram[phaseIndex].weeks[weekIndex].days[dayIndex].exercises[
      exerciseIndex
    ] = { ...newExerciseValues };

    return newProgram;
  }
);

export default programSlice.reducer;
