import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './../store/store';
import { API_URL } from '@/constants/ApiRoutes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { ToastAndroid } from 'react-native'; // Import ToastAndroid

// Define a type for the slice state
export interface LoginState {
  isLoading: boolean;
  isError: any;
  isSuccess: boolean;
  mobileNumber: string;
  password: string;
}

// Define the initial state using that type
const initialState: LoginState = {
  isLoading: false,
  isError: null,
  isSuccess: false,
  mobileNumber: '',
  password: '',
};

// Asynchronous thunk action
export const login = createAsyncThunk(
  'login/user',
  async (_, { getState }) => {
    const state = getState() as RootState;
    try {
      const url = `${API_URL}/v1/api/login?mobileNumber=${state.login.mobileNumber}&password=${state.login.password}`;
      console.log(url);
      const response = await axios.get(url);
      console.log(response.data);
      if (response.data.status === "200") {
        await AsyncStorage.setItem("tokenUserID", response.data.data[0].userId);
        return response.data;
      } else {
        console.log(response.data.message);
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.log(error.response?.data?.message)
      throw new Error(error.response?.data?.message || 'An error occurred');
    }
  }
);
export const register = createAsyncThunk(
  'register/user',
  async (requestedData:any) => {
    
    try {
      const url = `${API_URL}/user`;
      console.log(url);
      const response = await axios.post(url,requestedData);
      console.log(response.data);
      if (response.data.userId) {
      
        return response.data;
      } else {
        console.log(response.data.message);
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.log(error.response?.data?.message)
      throw new Error(error.response?.data?.message || 'An error occurred');
    }
  }
);
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setMobileNumber(state, action: PayloadAction<string>) {
      state.mobileNumber = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setIsSuccess(state,action){
      state.isSuccess = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
       
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        ToastAndroid.show('Login failed', ToastAndroid.SHORT); // Show toast message on login failure
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
       
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        ToastAndroid.show('Login failed', ToastAndroid.SHORT); // Show toast message on login failure
      });
  },
});

export const { setMobileNumber, setPassword,setIsSuccess } = loginSlice.actions;


export default loginSlice.reducer;
