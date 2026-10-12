import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepages from './features/users/consumer/homepages/homepages'
import Login from './features/auth/login/login'
import Register from './features/auth/register/register'
import SelectAccount from './features/auth/account/selectAccount'
import { RolePlaceholder } from './features/auth/account/components/formSelect'
import Denied from './features/auth/denied/denied'
import Reset from './features/auth/reset/reset'
import Ban from './features/auth/ban/ban'
import './css/index.css'
import './css/App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/select-account" element={<SelectAccount />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/ban" element={<Ban />} />
        <Route path="/register/buyer" element={<RolePlaceholder role="comprador" />} />
        <Route path="/register/seller" element={<RolePlaceholder role="vendedor" />} />
        <Route path="/" element={<Homepages />} />
        <Route path="/:gender" element={<Homepages />} />
        <Route path="*" element={<Homepages />} />
      </Routes>
    </BrowserRouter>
  )
}
