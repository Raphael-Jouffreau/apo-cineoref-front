import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../services/auth.service';
import { setMessage } from './messageSlice';

const user = JSON.parse(localStorage.getItem('user'));

export const register = createAsyncThunk(
  'auth/register',
  async ({
    username, email, birthday, password,
  }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, birthday, password);
      thunkAPI.dispatch(setMessage(response.message));
      return { message: response.message, user: response };
    }
    catch (error) {
      const message = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data };
    }
    catch (error) {
      const message = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    [register.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
