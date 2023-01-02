import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

const confirmStepFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 letras!' }),
  email: z.string().email({ message: 'Digite um E-mail válido' }),
  notes: z.string().nullable(),
})

type ConfirmStepFormData = z.infer<typeof confirmStepFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmStepFormData>({
    resolver: zodResolver(confirmStepFormSchema),
  })

  async function handleConfirmForm(data: ConfirmStepFormData) {
    console.log(data)
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmForm)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          02 de Janeiro de 2023
        </Text>
        <Text>
          <Clock />
          12:00h
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name?.message && (
          <FormError size="sm">{errors.name.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Endereço de E-mail</Text>
        <TextInput
          type="email"
          placeholder="jonhdoe@example.com"
          {...register('email')}
        />
        {errors.email?.message && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('notes')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
