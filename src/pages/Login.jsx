// src/containers/Login/Login.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { loginSchema } from '../schemas/loginSchema'
import { useLoginMutation } from '../features/auth/authApi'
import { setCredentials } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const res = await login(values).unwrap()
              dispatch(setCredentials(res))
              navigate('/dashboard')
            } catch (err) {
              setErrors({ email: 'Invalid credentials' })
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block">Email</label>
                <Field name="email" className="input" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block">Password</label>
                <Field name="password" type="password" className="input" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
