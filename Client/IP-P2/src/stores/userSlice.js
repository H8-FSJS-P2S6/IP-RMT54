import {createSlice} from "@reduxjs/toolkit"
import Swal from "sweetalert2"
import axios from "axios"

export const fetchLogin =() =>{
    return async (dispatch) => {
        try {
            await axios.post("http://localhost:3000/login");
        } catch (error) {
            
        }
    }
}