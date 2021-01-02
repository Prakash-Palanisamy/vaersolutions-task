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

const Register = (props) => {
        const formik = useFormik({
            initialValues : {
                name: '',
                email: '',
                password: '',
                confirmpassword: ''
            },
            validationSchema: yup.object({
                name: yup.string()
                .required("Name is required")
                .strict()
                .trim()
                .min(3, "Minimum 5 characters required")
                .max(15, "Maximum 15 characters only"),
                email: yup.string()
                .email()
                .required("Email is required"),
                password: yup.string()
                .required("Password is required"),
                confirmpassword: yup.string()
                .oneOf([yup.ref('password'),null],"Password and Confirm Password must be same")
                .required("Confirm Password is required")
            }),
            onSubmit(data){
                console.log(data);
                axios.post('http://localhost:5000/api/register',data)
                .then(res => {
                    props.history.push('/login');
                })
                .catch(error => {
                    toast.error(error.response.data);
                })
               
            }
        })
    return(
        <div className ="container mt-3">
           <div className="heading">
                <h1>Registration Page</h1>
                </div>
          
            <div className="jumbotron">
                
            <form onSubmit ={formik.handleSubmit}>
                <div className= "form-group">
                <label>Name</label>
                <input
                className="form-control"
                type ="text"
                name = "name"
                onChange ={formik.handleChange}
                value = {formik.values.name}
                />
                {
                    formik.errors.name ?
                    <div className="text-danger">{formik.errors.name}</div>
                    :null
                }
                </div>
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
                <div className= "form-group">
                <label> Confirm Password</label>
                <input
                className="form-control"
                type ="password"
                name = "confirmpassword"
                onChange ={formik.handleChange}
                value = {formik.values.confirmpassword}
                />
                {
                    formik.errors.confirmpassword ?
                    <div className="text-danger">{formik.errors.confirmpassword}</div>
                    :null
                }
                </div>
                <button type="submit" className="btn btn-primary">Create Account</button>
                <br/><p>Already have account  <Link href="#" onClick={()=>{
                    window.location.href = 'login';
                }}>Login</Link> here!</p>
                
            </form>
            </div>
        </div>
    )
}

export default Register;