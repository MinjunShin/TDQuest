import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { TDQuestAPI } from "../../API/tdquestAPI";

export interface CharacterState {
  createdAt: string;
  exp: number;
  id: number;
  image: any;
  level: number;
  medal: any;
  status_int: number;
  status_phy: number;
  status_spi: number;
  totalExp: number;
  updatedAt: string;
  user_id: number;
  status: string;
}

const initialState: CharacterState = {
  status: "",
  createdAt: "",
  exp: 0,
  id: 0,
  image: 0,
  level: 0,
  medal: 0,
  status_int: 0,
  status_phy: 0,
  status_spi: 0,
  totalExp: 0,
  updatedAt: "",
  user_id: 0,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getCharacterAsync = createAsyncThunk(
  // 'character/fetchData',
  // async () => {
  //   // The value we return becomes the `fulfilled` action payload
  //   // Axios
  //   // const response = await ;
  //   // return response.data;
  // }
  //example:::
  "get/:id",
  async (arg: string) => {
    try {
      const response = await TDQuestAPI.get(`character/?user_id=${arg}`);
      return response.data;
    } catch (err: any) {
      console.log(err.response);
    }
  }
);

export const characterSlice = createSlice({
  name: "character",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getCharacterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCharacterAsync.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(getCharacterAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// export const {  } = characterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default characterSlice.reducer;
