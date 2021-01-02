import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Link } from 'react-router-dom';

// const validate = values => {
//     var errors = {};
//     if(!values.name){
//         errors.name ="Name is required";
//     }
//     return errors;
// }

const Login = (props) => {
        const formik = useFormik({
            initialValues : {
                email: '',
                password: '',
            },
            validationSchema: yup.object({
                email: yup.string()
                .email()
                .required("Email is required"),
                password: yup.string()
                .required("Password is required")
            }),
            onSubmit(data){
                console.log(data);
                axios.post('http://localhost:5000/api/login',data)
                .then(res => {
                    localStorage.setItem('auth',JSON.stringify(res.data));
                    localStorage.setItem('email',JSON.stringify(data.email));
                    props.history.push('/home');
                })
                .catch(error => {
                    toast.error(error.response.data);
                })
               
            }
        })
    return(
        <div className ="container mt-3">
            <div className="heading">
                <h1>Login Page</h1>
                </div>
            <div className="jumbotron">
            <form onSubmit ={formik.handleSubmit}>
                <div className= "form-group">
                <label>Email</label>
                <input
                className="form-control"
                type ="text"
                name = "email"
                onChange ={formik.handleChange}
                value = {formik.values.email}
                />
                {
                    formik.errors.email ?
                    <div className="text-danger">{formik.errors.email}</div>
                    :null
                }
                </div>
                <div className= "form-group">
                <label>Password</label>
                <input
                className="form-control"
                type ="password"
                name = "password"
                onChange ={formik.handleChange}
                value = {formik.values.password}
                />
                {
                    formik.errors.password ?
                    <div className="text-danger">{formik.errors.password}</div>
                    :null
                }
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <br/><p>You don't have account  <Link href="#" onClick={()=>{
                    window.location.href = 'register';
                }}>Register</Link> here!</p>
            </form>
            </div>
        </div>
    )
}

export default Login;