import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Cookies } from "react-cookie";

const cookies = new Cookies();


export interface userType {
    user: {
        name: string | null,
        // profilePicture: string | null, 
        role: "admin" | "shelter"
    }
}

type addUserType = {
    name: string,
    // profilePicture: string, 
    role: "admin" | "shelter"
}

const initialState: userType = {
    user: {
        name: null,
        // profilePicture: null,
        role: "shelter"
    }
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserDetails: (state, { payload }: PayloadAction<addUserType>) => {
            state.user.name = payload?.name;
            // state.user.profilePicture = payload?.profilePicture;
            state.user.role = payload?.role
        },

        removeUser: (state) => {
            state.user.name = null;
            // state.user.profilePicture = null;

            cookies.remove("accessToken", { path: "/" });
            cookies.remove("token", { path: "/" });
            cookies.remove("refreshToken", { path: "/" });
        },
    },
})

// Action creators are generated for each case reducer function
export const { addUserDetails, removeUser } = userSlice.actions;

export default userSlice.reducer;