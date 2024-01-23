import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";


interface Iuser {
    user: {
        email: string | null,
    },
    isLoading: boolean,
    isError: boolean,
    error: string | null
}

const initialState: Iuser = {
    user: {
        email: null,
    },
    isLoading: false,
    isError: false,
    error: null
}

export const createUser = createAsyncThunk(
    'user/createUser', async ({ email, password }: { email: string, password: string }) => {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        return data.user.email;
    })
export const loggedUser = createAsyncThunk(
    'user/loggedUser', async ({ email, password }: { email: string, password: string }) => {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data.user.email;
    })
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user.email = action.payload;
        },
        setLoading: (state, action) =>{
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;

        }).addCase(createUser.fulfilled, (state, action) => {
            state.user.email = action.payload;
            state.isLoading = false;

        }).addCase(createUser.rejected, (state, action) => {
            state.user.email = null;
            state.isError = true;
            state.error = action.error.message!;

        }).addCase(loggedUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;

        }).addCase(loggedUser.fulfilled, (state, action) => {
            state.user.email = action.payload;
            state.isLoading = false;

        }).addCase(loggedUser.rejected, (state, action) => {
            state.user.email = null;
            state.isError = true;
            state.error = action.error.message!;
        })
    }

})
export const { setUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
