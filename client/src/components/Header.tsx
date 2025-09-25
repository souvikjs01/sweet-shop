import { Link } from "react-router-dom";
import { useUserData } from "../context/UserContext";

export function Header() {
  const { user, logout } = useUserData()
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-2xl font-bold">
          Sweet Shop
        </p>
        <nav>
          <ul className="flex items-center space-x-4">
            {user?.role === "ADMIN" && (
                <li>              
                  <Link to="/admin" className="hover:underline py-2 px-4">
                    Admin
                  </Link>
            </li>
            )}
            
            <li>
              <button  className="py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-medium transition-colors "
                onClick={() => logout()}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
