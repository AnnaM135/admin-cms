// src/schemas/loginSchema.js
import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too Short!').required('Required'),
})
