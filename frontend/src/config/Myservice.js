import axios from 'axios';
import { MAIN_URL } from './Url';
export function getPosts(){
    return axios.get(`${MAIN_URL}posts/fetchpost`);
}
export function addPost(data){
    return axios.post(`${MAIN_URL}posts/addpost`,data);
}
export function Login(data){
    return axios.post(`${MAIN_URL}posts/signin`,data);
}
export function addsetting(data){
    return axios.post(`${MAIN_URL}posts/addsetting`,data);
}
export function getSetting(data){
    return axios.post(`${MAIN_URL}posts/getsetting`,data);
}
export function fetchproduct(data){
    return axios.post(`${MAIN_URL}posts/fetchproduct`,data) 
}

export function deleteInvoice(id){
    return axios.post(`${MAIN_URL}posts/deleteinvoice`,id)
}

export function Updatepost(id){
    return axios.post(`${MAIN_URL}posts/updatepost`,id)
}
export function addInvoice(data){
    return axios.post(`${MAIN_URL}posts/addinvoice`,data)
}
export function email(data){
    return axios.post(`${MAIN_URL}posts/email`,data,{
        headers:{
            'Content-Type':"multipart/form-data"
        }
    }) 
}