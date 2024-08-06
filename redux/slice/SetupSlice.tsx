import { API_URL } from '@/constants/ApiRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ToastAndroid } from 'react-native';


// Define a type for the slice state
export interface ActionState {
  isLoading: boolean;
  isError: boolean;
  error: any;
  isSuccess: boolean;
  
}

// Define the initial state using that type
const initialState: ActionState = {
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
 
};

// Create an async thunk to fetch and process contacts
export const addContactsToTheDataBase = createAsyncThunk(
  'setup/addContact',
  async (contacts: any[]) => {
    try{
     const tokenUserID = await AsyncStorage.getItem('tokenUserID')
     const URL = API_URL+'/v1/api/contact/'+tokenUserID;
     console.log(URL);
     const response = await axios.post(URL,{
        "contacts":contacts
      })
    console.log(response.data);
    if(response.data.status==="201")
    {
        return {
            status: response.data.status,
            message:response.data.message
        }
    }
    else{
        ToastAndroid.show("Unable to add the Contacts",ToastAndroid.LONG);
    }
    } catch(error){
        console.log(error);
        ToastAndroid.show("Internal Server Error",ToastAndroid.LONG);
    }
    
  }
);

export const getContactsFromDatabase = createAsyncThunk('setup/getContacts',async()=>{
    try{    
            const tokenUserID = await AsyncStorage.getItem('tokenUserID');
            const URL = API_URL+'/v1/api/contact/'+tokenUserID;
            const response = await axios.get(URL);
            if(response.data.status==="200")
            {
                return response.data.data;
            }
            else{
                ToastAndroid.show("Unable to get the Contacts",ToastAndroid.LONG);
            }
    }catch(error)
    {
          console.log(error);
          ToastAndroid.show("Internal server Error",ToastAndroid.LONG);
    }
})
export const actionSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContactsToTheDataBase.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addContactsToTheDataBase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
      })
      .addCase(addContactsToTheDataBase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { setIsLoading, setIsError } = actionSlice.actions;

export default actionSlice.reducer;
