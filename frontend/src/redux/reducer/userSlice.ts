import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 타입 정의
// 상태 타입 정의
interface userState {
  accessToken: string | null;
}

let initialState: userState = {
  accessToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // userName 업데이트 액션
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    // 초기화 액션
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
