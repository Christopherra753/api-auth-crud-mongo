import { z } from 'zod'

const registerSchema = z.object({
  username: z.string({
    required_error: 'Username requerido',
    invalid_type_error: 'Username invalido'
  }),
  email: z.string({
    required_error: 'Email requerido',
    invalid_type_error: 'Email invalido'
  }).email({
    message: 'Email invalido'
  }),
  password: z.string({
    required_error: 'Contraseña requerida',
    invalid_type_error: 'Contraseña invalida'
  }).min(8, {
    message: 'Minimo 8 caracteres'
  })
})

const loginSchema = z.object({
  email: z.string({
    invalid_type_error: 'Email invalido',
    required_error: 'Email requerido'
  }).email({
    message: 'Email invalido'
  }),
  password: z.string({
    required_error: 'Contraseña requerida',
    invalid_type_error: 'Contraseña invalida'
  }).min(8, {
    message: 'Minimo 8 caracteres'
  })
})

export const validateRegister = (object) => {
  return registerSchema.safeParse(object)
}
export const validateLogin = (object) => {
  return loginSchema.safeParse(object)
}
