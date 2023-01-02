import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { ConfirmForm, FormActions, FormHeader } from './styles'

export function ConfirmStep() {
  async function handleConfirmForm() {}

  return (
    <ConfirmForm as="form" onSubmit={handleConfirmForm}>
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
        <TextInput placeholder="Seu nome" />
      </label>

      <label>
        <Text size="sm">Endereço de E-mail</Text>
        <TextInput type="email" placeholder="jonhdoe@example.com" />
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}
