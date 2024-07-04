import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; //createAsyncThunk handle asynconomous function 
import axios from "axios";
import { toast } from "react-toastify";

// My API 
const apiurl = 'http://localhost:3003/todolist'

// Call Api for Add Product
export const addtodo = createAsyncThunk("addtodo", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(apiurl, data);
        console.log("Fetching Add Todo data", response);
        toast.success("Todo Added Successfully")
        return response.data;
    } catch (error) {
        console.log("Error Fetching Add Todo data", error);
        toast.error("Todo Is Not Added ")
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Show All Product
export const alltodo = createAsyncThunk("alltodo", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(apiurl);
        console.log("Fetching All Todo data", response);
        return response?.data;
    } catch (error) {
        console.log("Error Fetching All Todo data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Details Customer
export const detailstodo = createAsyncThunk("detailstodo", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${apiurl}/${id}`)
        console.log("Fetching Details data", response);
        return response?.data;
    } catch (error) {
        console.log("Error Fetching Details data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Edit Product
export const edittodo = createAsyncThunk("edittodo", async ({ data, id }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${apiurl}/${id}`, data);
        console.log("Fetching Edit  data", response);
        toast.success("Edit  Successfully");
        return response?.data;
    } catch (error) {
        console.log("Error Fetching Edit  data", error);
        toast.error("Edit Is Not Make");
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Delete Todo
export const deletetodo = createAsyncThunk("deletetodo", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${apiurl}/${id}`)
        console.log("Fetching Delete Todo data", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Delete Todo data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

