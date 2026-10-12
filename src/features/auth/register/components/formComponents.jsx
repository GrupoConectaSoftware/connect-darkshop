import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleButton from '../../../../components/ui/GoogleButton'
import PasswordValidation from '../../../../components/ui/PasswordValidation'
import SessionButton from '../../../../components/ui/SessionButton'

const validateEmail = (value) => {
  if (!value.trim()) return 'Ingresa tu email.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Ingresa un email válido.'
  return ''
}

const validatePassword = (value) => {
  if (!value) return 'Ingresa una contraseña.'
  if (value.length < 8 || !/[A-ZÁÉÍÓÚÑ]/.test(value) || !/[a-záéíóúñ]/.test(value) || !/\d/.test(value)) return 'Completa los requisitos de contraseña.'
  return ''
}

export default function RegisterForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState({ name: '', email: '', password: '', terms: '' })
  const [notice, setNotice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {
      name: name.trim() ? '' : 'Ingresa tu nombre.',
      email: validateEmail(email),
      password: validatePassword(password),
      terms: acceptedTerms ? '' : 'Debes aceptar los términos y condiciones.',
    }
    setErrors(nextErrors)
    setNotice('')
    if (Object.values(nextErrors).every((error) => !error)) navigate('/select-account')
  }

  const inputClass = (hasError) => `h-9 w-full border bg-dark-white px-4 font-body text-sm text-dark-950 outline-none transition-colors duration-200 placeholder:text-dark-400 focus:ring-2 focus:ring-dark-red/20 sm:h-10 ${hasError ? 'border-red-500' : 'border-dark-200 focus:border-dark-red'}`

  return (
    <div className="w-full min-w-0 gap-5">
      <GoogleButton fullWidth onClick={() => setNotice('El registro con Google estará disponible próximamente.')}>Continuar con Google</GoogleButton>
      <div className="my-2 flex items-center gap-4 sm:my-3" aria-hidden="true">
        <span className="h-px flex-1 bg-dark-700" />
        <span className="font-body text-[10px] font-medium uppercase text-dark-300">o continuar con email</span>
        <span className="h-px flex-1 bg-dark-700" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2.5 sm:gap-3">
        <div>
          <label htmlFor="register-name" className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-dark-white">Ingresa tu nombre <span className="text-dark-400">*</span></label>
          <input id="register-name" name="name" type="text" autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); setNotice('') }} onBlur={() => setErrors((current) => ({ ...current, name: name.trim() ? '' : 'Ingresa tu nombre.' }))} aria-invalid={Boolean(errors.name)} aria-describedby="register-name-error" placeholder="Tu nombre completo" className={inputClass(errors.name)} />
          <p id="register-name-error" aria-live="polite" className={errors.name ? 'pt-0.5 font-body text-[11px] text-red-500' : 'sr-only'}>{errors.name}</p>
        </div>
        <div>
          <label htmlFor="register-email" className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-dark-white">Ingresa tu email <span className="text-dark-400">*</span></label>
          <input id="register-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setNotice('') }} onBlur={() => setErrors((current) => ({ ...current, email: validateEmail(email) }))} aria-invalid={Boolean(errors.email)} aria-describedby="register-email-error" placeholder="tú@correo.com" className={inputClass(errors.email)} />
          <p id="register-email-error" aria-live="polite" className={errors.email ? 'pt-0.5 font-body text-[11px] text-red-500' : 'sr-only'}>{errors.email}</p>
        </div>
        <div>
          <label htmlFor="register-password" className="mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-dark-white">Ingresa tu contraseña <span className="text-dark-400">*</span></label>
          <div className={`flex h-9 items-center border bg-dark-white transition-colors duration-200 focus-within:ring-2 focus-within:ring-dark-red/20 sm:h-10 ${errors.password ? 'border-red-500' : 'border-dark-200 focus-within:border-dark-red'}`}>
            <input id="register-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={(event) => { setPassword(event.target.value); setNotice('') }} onBlur={() => setErrors((current) => ({ ...current, password: validatePassword(password) }))} aria-invalid={Boolean(errors.password)} aria-describedby="register-password-error password-requirements" placeholder="Crea una contraseña segura" className="h-full min-w-0 flex-1 bg-transparent px-4 font-body text-sm text-dark-950 outline-none placeholder:text-dark-400" />
            <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} className="grid size-10 shrink-0 cursor-pointer place-items-center text-dark-500 transition-colors hover:text-dark-950 focus-visible:outline focus-visible:outline-dark-red">{showPassword ? <EyeOff size={18} strokeWidth={1.6} /> : <Eye size={18} strokeWidth={1.6} />}</button>
          </div>
          <div id="password-requirements"><PasswordValidation password={password} error={errors.password} /></div>
        </div>
        <div className="pb-1">
          <label htmlFor="register-terms" className="flex cursor-pointer items-start gap-2 font-body text-[10px] leading-relaxed text-dark-300 sm:text-xs">
            <input id="register-terms" name="terms" type="checkbox" checked={acceptedTerms} onChange={(event) => { setAcceptedTerms(event.target.checked); setErrors((current) => ({ ...current, terms: event.target.checked ? '' : current.terms })) }} className="mt-0.5 size-4 shrink-0 accent-dark-red" />
            <span>Aceptar los <a href="#terminos" className="font-semibold text-dark-white underline underline-offset-2">términos y condiciones</a>, incluyendo <a href="#privacidad" className="font-semibold text-dark-white underline underline-offset-2">políticas de privacidad</a>.</span>
          </label>
          {errors.terms && <p aria-live="polite" className="pt-0.5 font-body text-[11px] text-red-500">{errors.terms}</p>}
        </div>
        <SessionButton type="submit" fullWidth>Registrar cuenta</SessionButton>
        {notice && <p role="status" aria-live="polite" className="pt-0.5 font-body text-xs text-dark-300">{notice}</p>}
      </form>
      <p className="mt-6 text-center font-body text-xs font-light text-dark-400 sm:text-sm">¿Ya tienes cuenta? <Link to="/login" className="font-medium text-dark-white transition-colors hover:text-dark-red">Iniciar sesión</Link></p>
    </div>
  )
}
