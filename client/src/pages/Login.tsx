
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from "react";

import {  useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  
const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});


const navigate = useNavigate();


const handleLogin = async (formValue: FormikValues) => {
  const { email, password } = formValue;
  setMessage("");
  setLoading(true);

  try {
    await login(email, password);
    navigate("/");
  } catch (error: any) {
    const resMessage =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    setLoading(false);
    setMessage(resMessage);
  }
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
