import { 
  BrowserRouter, 
  Routes, 
  Route 
} from "react-router-dom"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import { useUserData } from "./context/UserContext"
import AdminPage from "./pages/Admin"

function App() {
  const { isAuth } = useUserData()
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Auth auth="LOGIN" />} />
            <Route path="/signup" element={<Auth auth="SIGNUP" />} />
            <Route path="/home" element={isAuth ? <Home /> : <Auth auth="LOGIN" /> } />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
