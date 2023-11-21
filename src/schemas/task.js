import { z } from 'zod'

const taskSchema = z.object({
  title: z.string({
    invalid_type_error: 'Titulo invalido',
    required_error: 'Titulo requerido'
  }),
  description: z.string({
    invalid_type_error: 'Descripcion invalido',
    required_error: 'Descripcion requerido'
  }),
  date: z.date({
    invalid_type_error: 'Fecha Invalida'
  }).optional()
})

export const validateTask = (object) => {
  return taskSchema.safeParse(object)
}

export const validatePartialTask = (object) => {
  return taskSchema.partial().safeParse(object)
}
