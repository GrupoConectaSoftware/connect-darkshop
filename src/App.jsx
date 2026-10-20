import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepages from './features/users/consumer/homepages/homepages'
import Login from './features/auth/login/login'
import Register from './features/auth/register/register'
import SelectAccount from './features/auth/account/selectAccount'
import { RolePlaceholder } from './features/auth/account/components/formSelect'
import Denied from './features/auth/denied/denied'
import Reset from './features/auth/reset/reset'
import Ban from './features/auth/ban/ban'
import Verify from './features/auth/identity/identify'
import Recovery from './features/auth/recovery/recovery'
import Sent from './features/auth/send/send'
import Expired from './features/auth/expired/expired'
import Preview from './features/users/consumer/preview/preview'
import Favorite from './features/users/consumer/favorites/favorite'
import Shopping from './features/users/consumer/shopping/shopping'
import Legal from './features/users/consumer/legal/legal'
import Stores from './features/users/consumer/stores/stores'
import Clothes from './features/users/consumer/clothes/clothes'
import Logged from './features/users/consumer/logged/logged'
import Brand from './features/users/brand/brand'
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
        <Route path="/verify" element={<Verify />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/expired" element={<Expired />} />
        <Route path="/preview/:slug" element={<Preview />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/cart" element={<Shopping />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/catalog" element={<Clothes />} />
        <Route path="/logged" element={<Logged />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/set/:slug" element={<Logged />} />
        <Route path="/register/buyer" element={<RolePlaceholder role="comprador" />} />
        <Route path="/register/seller" element={<RolePlaceholder role="vendedor" />} />
        <Route path="/" element={<Homepages />} />
        <Route path="/:gender" element={<Homepages />} />
        <Route path="*" element={<Homepages />} />
      </Routes>
    </BrowserRouter>
  )
}
