import { Form } from 'antd'
import { useCallback, useState } from 'react'
import { registerFarmer } from '../services/farmerService'
import { splitCropCategories } from '../utils/format'
import { defaultRegistrationForm } from '../constants/forms'
import type { RegistrationFormData } from '../types/forms'
import type { StatusState } from '../types/status'

export function useRegistrationFlow() {
  const [form] = Form.useForm<RegistrationFormData>()
  const [status, setStatus] = useState<StatusState>({ state: 'idle' })

  const handleFinish = useCallback(
    async (values: RegistrationFormData) => {
      setStatus({ state: 'pending' })

      const payload = {
        name: values.name,
        mobileNumber: values.mobileNumber,
        password: values.password,
        village: values.village,
        district: values.district,
        landHoldings: {
          value: Number(values.landValue),
          unit: values.landUnit,
        },
        cropCategories: splitCropCategories(values.cropCategories),
      }

      try {
        const response = await registerFarmer(payload)
        if (!response.status) {
          const errorMessage = Array.isArray(response.error)
            ? response.error.join('; ')
            : response.error ?? 'Registration failed'
          setStatus({ state: 'error', message: errorMessage })
          return
        }

        setStatus({
          state: 'success',
          message: `${response.message} (ID: ${response.data?.farmerId ?? 'unknown'})`,
        })

        const preservedLandUnit = form.getFieldValue('landUnit') ?? defaultRegistrationForm.landUnit
        form.resetFields()
        form.setFieldsValue({ landUnit: preservedLandUnit })
      } catch (error) {
        setStatus({ state: 'error', message: 'Unable to reach backend' })
      }
    },
    [form],
  )

  return { form, status, handleFinish }
}
