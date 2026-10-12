import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepages from './features/users/consumer/homepages/homepages'
import Login from './features/auth/login/login'
import './css/index.css'
import './css/App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepages />} />
        <Route path="/:gender" element={<Homepages />} />
        <Route path="*" element={<Homepages />} />
      </Routes>
    </BrowserRouter>
  )
}
