import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { localStorageUtil } from "@/lib/localStorageUtil";
import type { TRootState } from "@/store";
import type { TNullish } from "@/store/api/common-api-types";

import type { TAuthInfo, TAuthState } from "./types";

const initialState: TAuthState = {
  memberAuth: null,
  adminAuth: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login(state, action: PayloadAction<TAuthInfo | TNullish>) {
      if (!action.payload) {
        return;
      }

      const role = action.payload.role;
      if (role === "Admin" || role === "SuperAdmin") {
        state.adminAuth = action.payload;
      } else if (role === "Member") {
        state.memberAuth = action.payload;
      }
    },

    logout(state, action: PayloadAction<{ role?: string } | undefined>) {
      const role = action.payload?.role;

      if (!role) {
        state.memberAuth = null;
        state.adminAuth = null;
        localStorageUtil.clear();
        return;
      }

      if (role === "Admin" || role === "SuperAdmin") {
        state.adminAuth = null;
      } else if (role === "Member") {
        state.memberAuth = null;
      }
    },

    updateToken: (
      state,
      action: PayloadAction<(Partial<TAuthInfo> & { role?: string }) | TNullish>
    ) => {
      if (!action.payload) {
        return;
      }

      const { role, ...tokenData } = action.payload;

      if (role === "Admin" || role === "SuperAdmin") {
        if (state.adminAuth) {
          state.adminAuth = { ...state.adminAuth, ...tokenData };
        }
      } else if (role === "Member") {
        if (state.memberAuth) {
          state.memberAuth = { ...state.memberAuth, ...tokenData };
        }
      }
    },
  },

  selectors: {
    // Auth User selectors
    selectAuthUser: (state) => state?.adminAuth?.user || state?.memberAuth?.user,

    // Auth Token selectors
    selectTokenInfo: (state) => ({
      admin: {
        accessToken: state?.adminAuth?.accessToken,
        refreshToken: state?.adminAuth?.refreshToken,
      },
      member: {
        accessToken: state?.memberAuth?.accessToken,
        refreshToken: state?.memberAuth?.refreshToken,
      },
    }),

    selectMemberAuth: (state) => state.memberAuth,
    selectAdminAuth: (state) => state.adminAuth,
  },
});

export const selectAuth = (state: TRootState): typeof state.authSlice =>
  state.authSlice;

export const { login, logout, updateToken } = authSlice.actions;

export const {
  selectAuthUser,
  selectTokenInfo,
  selectMemberAuth,
  selectAdminAuth,
} = authSlice.selectors;

const authReducer = authSlice.reducer;
export default authReducer;
