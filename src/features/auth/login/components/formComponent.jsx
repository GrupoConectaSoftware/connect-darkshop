import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import GoogleButton from '../../../../components/ui/GoogleButton'
import SessionButton from '../../../../components/ui/SessionButton'

const validateEmail = (value) => {
  if (!value.trim()) return 'Ingresa tu email.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Ingresa un email válido.'
  return ''
}

const validatePassword = (value) => {
  if (!value) return 'Ingresa tu contraseña.'
  if (value.length < 6) return 'Usa al menos 6 caracteres.'
  return ''
}

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [notice, setNotice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = { email: validateEmail(email), password: validatePassword(password) }
    setErrors(nextErrors)
    setNotice('')
    if (!nextErrors.email && !nextErrors.password) setNotice('La autenticación estará disponible próximamente.')
  }

  const fieldClass = (hasError) => `h-12 w-full border bg-dark-white px-4 font-body text-sm text-dark-950 outline-none transition-colors duration-200 placeholder:text-dark-400 focus:ring-2 focus:ring-dark-red/20 ${hasError ? 'border-red-500' : 'border-dark-200 focus:border-dark-red'}`

  return (
    <div className="w-full min-w-0">
      <GoogleButton fullWidth onClick={() => setNotice('El acceso con Google estará disponible próximamente.')}>Continuar con Google</GoogleButton>
      <div className="my-5 flex items-center gap-4 sm:my-6" aria-hidden="true">
        <span className="h-px flex-1 bg-dark-700" />
        <span className="font-body text-[10px] font-medium uppercase text-dark-300">o continuar con email</span>
        <span className="h-px flex-1 bg-dark-700" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        <div>
          <label htmlFor="login-email" className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-dark-white">Ingresa tu email <span className="text-dark-400">*</span></label>
          <input id="login-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setNotice('') }} onBlur={() => setErrors((current) => ({ ...current, email: validateEmail(email) }))} aria-invalid={Boolean(errors.email)} aria-describedby="login-email-error" placeholder="tú@correo.com" className={fieldClass(errors.email)} />
          <p id="login-email-error" aria-live="polite" className="min-h-5 pt-1 font-body text-xs text-red-500">{errors.email}</p>
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-dark-white">Ingresa tu contraseña <span className="text-dark-400">*</span></label>
          <div className={`flex h-12 items-center border bg-dark-white transition-colors duration-200 focus-within:ring-2 focus-within:ring-dark-red/20 ${errors.password ? 'border-red-500' : 'border-dark-200 focus-within:border-dark-red'}`}>
            <input id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setNotice('') }} onBlur={() => setErrors((current) => ({ ...current, password: validatePassword(password) }))} aria-invalid={Boolean(errors.password)} aria-describedby="login-password-error" placeholder="Ingresa tu contraseña" className="h-full min-w-0 flex-1 bg-transparent px-4 font-body text-sm text-dark-950 outline-none placeholder:text-dark-400" />
            <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} className="grid size-11 shrink-0 cursor-pointer place-items-center text-dark-500 transition-colors hover:text-dark-950 focus-visible:outline focus-visible:outline-dark-red">{showPassword ? <EyeOff size={18} strokeWidth={1.6} /> : <Eye size={18} strokeWidth={1.6} />}</button>
          </div>
          <p id="login-password-error" aria-live="polite" className="min-h-5 pt-1 font-body text-xs text-red-500">{errors.password}</p>
        </div>
        <div className="flex min-h-6 min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 pb-1 font-body text-[10px] sm:text-xs">
          <label htmlFor="remember-login" className="inline-flex shrink-0 cursor-pointer items-center gap-2 text-dark-300"><input id="remember-login" type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="size-4 accent-dark-red" />Recuérdame</label>
          <Link to="/recovery" className="ml-auto max-w-[65%] wrap-break-word text-right text-dark-300 underline decoration-dark-500 underline-offset-4 transition-colors hover:text-dark-white">¿Olvidaste tu contraseña?</Link>
        </div>
        <SessionButton type="submit" fullWidth>Iniciar sesión</SessionButton>
        <p role="status" aria-live="polite" className="min-h-5 pt-1 font-body text-xs text-dark-300">{notice}</p>
      </form>
      <p className="mt-3 text-center font-body text-sm font-light text-dark-400">Si aún no tienes cuenta, <Link to="/register" className="font-medium text-dark-white transition-colors hover:text-dark-red">Regístrate aquí</Link></p>
    </div>
  )
}
