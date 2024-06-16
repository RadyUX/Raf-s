
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import React, { useState } from "react";
import authService from '../service/authService';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  
const validationSchema = Yup.object().shape({
  email: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});


const navigate = useNavigate();

const handleLogin = (formValue: FormikValues) => {
  const { email, password } = formValue;
  setMessage("");
  setLoading(true);

  authService.login(email, password).then(
    () =>{
      navigate("/");
    },(error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setLoading(false);
      setMessage(resMessage);
    }
  )


  console.log('Email:', email, 'Password:', password);
};


  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      <Form>
        <div>
          <label htmlFor="email">email</label>
          <Field name="email" type="text" />
          <ErrorMessage name="email" component="div" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
        </div>

        <div>
          <button type="submit">
            Login
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default Login;
