import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../../../lib/api'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

const confirmStepFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 letras!' }),
  email: z.string().email({ message: 'Digite um E-mail válido' }),
  notes: z.string().nullable(),
})

type ConfirmStepFormData = z.infer<typeof confirmStepFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmStepFormData>({
    resolver: zodResolver(confirmStepFormSchema),
  })

  const { query } = useRouter()

  const username = String(query.username)

  async function handleConfirmForm(data: ConfirmStepFormData) {
    const { name, email, notes } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      notes,
      date: schedulingDate,
    })

    onCancelConfirmation()
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmForm)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
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
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
