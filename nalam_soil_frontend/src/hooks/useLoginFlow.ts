import { Form } from 'antd'
import { useCallback, useState } from 'react'
import { loginFarmer } from '../services/farmerService'
import type { Farmer } from '../types/farmer'
import type { LoginFormData } from '../types/forms'
import type { StatusState } from '../types/status'

type LoginStatus = StatusState & { farmer?: Farmer }

export function useLoginFlow() {
  const [form] = Form.useForm<LoginFormData>()
  const [status, setStatus] = useState<LoginStatus>({ state: 'idle' })

  const handleFinish = useCallback(
    async (values: LoginFormData) => {
      setStatus({ state: 'pending' })

      try {
        const response = await loginFarmer({
          mobileNumber: values.mobileNumber,
          password: values.password,
        })

        if (!response.status) {
          const errorMessage = Array.isArray(response.error)
            ? response.error.join('; ')
            : response.error ?? 'Login failed'
          setStatus({ state: 'error', message: errorMessage })
          return
        }

        setStatus({
          state: 'success',
          message: response.message,
          farmer: response.data?.farmer,
        })
        form.resetFields()
      } catch (error) {
        setStatus({ state: 'error', message: 'Unable to reach backend' })
      }
    },
    [form],
  )

  return { form, status, handleFinish }
}
