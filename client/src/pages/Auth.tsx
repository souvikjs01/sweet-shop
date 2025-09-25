import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserData } from "../context/UserContext"

interface IAppProp {
  auth: "SIGNUP" | "LOGIN"
}

export default function Auth({ auth }: IAppProp) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { loginUser, registerUser } = useUserData()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // console.log("Signup submitted:", { firstName, lastName, email, password })

    if(auth === "SIGNUP") {
      // sign up:
      registerUser(firstName, lastName, email, password, navigate)
    } else {
      // login
      loginUser(email, password, navigate)
    }
  }

  return (
    <div className=" flex min-h-screen justify-center items-center">
      <div className="w-full max-w-sm rounded-sm border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-1 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {auth === "SIGNUP" ? "Register" : "Login"}
          </h2>
          <p className="text-gray-700 dark:text-gray-400">
            {auth === "SIGNUP" ? "Enter your information to create an account" : "Enter your credentials"}
          </p>
        </div>
        <div className="grid gap-4">
          <form onSubmit={handleSubmit} className="grid gap-4">
            { auth === "SIGNUP" ? (
                <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="first-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="last-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            ) : (
              <></>
            ) } 
              
            

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {auth === "SIGNUP" ? "Sign Up" : "Login"}
            </button>
          </form>
        </div>
        <div className="pt-4 text-center">
          {auth === "SIGNUP" ? (
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Already have an account? 
              <Link to={"/login"}>
                Login
              </Link>
            </p>
          ) : (
            <p className="text-sm text-gray-700 dark:text-gray-400">
              New user?
              <Link to={"/signup"}>
                Register
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
