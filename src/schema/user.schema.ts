import {object, string, TypeOf} from 'zod'

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Nome é obrigatório'
    }),
    password: string({
      required_error: 'Senha é obrigatório'
    }).min(6, 'A senha deve ter pelo menos 6 caracteres').max(32, 'A senha deve ter no maxímo 32 caracteres'),
    passwordConfirmation: string({
      required_error: 'Confirmação de senha é obrigatório'
    }),
    email: string({
      required_error: 'Email é obrigatório'
    }).email('Email inválido')
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Senhas não conferem',
    path: ["passwordConfirmation"]
  })
})

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
  >