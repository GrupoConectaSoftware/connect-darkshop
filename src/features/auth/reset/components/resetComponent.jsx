import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import PasswordValidation from '../../../../components/ui/PasswordValidation'

const validatePassword = (value) => {
  if (!value) return 'Ingresa una contraseña.'
  if (value.length < 8 || !/[A-ZÁÉÍÓÚÑ]/.test(value) || !/[a-záéíóúñ]/.test(value) || !/\d/.test(value)) {
    return 'Completa los requisitos de contraseña.'
  }
  return ''
}

const inputBaseClass = 'w-full border bg-white px-4 py-4 pr-12 font-body text-sm text-neutral-950 outline-none transition-colors duration-200 placeholder:text-neutral-400'

export default function ResetComponent({ onSubmit, onBack }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' })
  const [notice, setNotice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const passwordError = validatePassword(password)
  const passwordIsValid = !passwordError

  const validate = () => {
    const nextErrors = {
      password: passwordError,
      confirmPassword: !confirmPassword
        ? 'Confirma tu contraseña.'
        : confirmPassword === password
          ? ''
          : 'Las contraseñas no coinciden.',
    }
    setErrors(nextErrors)
    return !nextErrors.password && !nextErrors.confirmPassword
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setNotice('')
    if (!validate()) return

    setIsSubmitting(true)
    try {
      await onSubmit?.({ password, confirmPassword })
      setNotice('La nueva contraseña está lista. Conecta el servicio de recuperación para guardarla.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const updatePassword = (value) => {
    setPassword(value)
    setNotice('')
    setErrors((current) => ({
      ...current,
      password: '',
      confirmPassword: confirmPassword && value !== confirmPassword ? 'Las contraseñas no coinciden.' : '',
    }))
  }

  const updateConfirmPassword = (value) => {
    setConfirmPassword(value)
    setNotice('')
    setErrors((current) => ({
      ...current,
      confirmPassword: value && value !== password ? 'Las contraseñas no coinciden.' : '',
    }))
  }

  return (
    <div className="w-full max-w-xl">
      <p className="mb-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-neutral-500">Seguridad</p>
      <h1 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] uppercase leading-[1.05] tracking-[-0.04em] text-neutral-950">
        Crea una nueva contraseña
      </h1>
      <p className="mb-8 mt-4 font-body text-base font-light leading-snug text-neutral-500 sm:mb-10 sm:text-lg">
        Elige una contraseña que no hayas usado antes en la tienda.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="reset-password" className="mb-2 block font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] text-neutral-950">
            Ingresa tu contraseña <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              id="reset-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={password}
              onChange={(event) => updatePassword(event.target.value)}
              onBlur={() => password && setErrors((current) => ({ ...current, password: passwordError }))}
              aria-invalid={Boolean(errors.password)}
              aria-describedby="reset-password-requirements"
              placeholder="Crea una contraseña segura"
              className={`${inputBaseClass} ${errors.password ? 'border-red-500' : 'border-neutral-300 focus:border-neutral-900'}`}
            />
            <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center text-neutral-400 transition-colors duration-200 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div id="reset-password-requirements">
            <PasswordValidation password={password} error={errors.password} />
          </div>
        </div>

        <div>
          <label htmlFor="reset-confirm-password" className="mb-2 block font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] text-neutral-950">
            Confirma tu contraseña <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              id="reset-confirm-password"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => updateConfirmPassword(event.target.value)}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby="reset-confirm-password-requirements"
              placeholder="Confirma tu contraseña"
              className={`${inputBaseClass} ${errors.confirmPassword ? 'border-red-500' : 'border-neutral-300 focus:border-neutral-900'}`}
            />
            <button type="button" onClick={() => setShowConfirm((visible) => !visible)} aria-label={showConfirm ? 'Ocultar confirmación' : 'Mostrar confirmación'} className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center text-neutral-400 transition-colors duration-200 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900">
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div id="reset-confirm-password-requirements">
            <PasswordValidation password={confirmPassword} error={errors.confirmPassword} />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button type="submit" disabled={!password || !confirmPassword || !passwordIsValid || password !== confirmPassword || isSubmitting} className="inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 bg-neutral-950 px-6 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {isSubmitting && <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white border-r-transparent" />}
            Actualizar contraseña
          </button>
          <button type="button" onClick={onBack} className="min-h-14 w-full cursor-pointer border border-neutral-950 bg-transparent px-6 py-4 font-body text-xs font-medium uppercase tracking-[0.16em] text-neutral-950 transition-colors duration-200 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2">
            Volver a mi cuenta
          </button>
        </div>
        {notice && <p role="status" aria-live="polite" className="font-body text-xs leading-relaxed text-neutral-600">{notice}</p>}
      </form>
    </div>
  )
}
