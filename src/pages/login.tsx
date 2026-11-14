import axios from "axios";
import { useNavigate } from "react-router-dom";

import { zJwtResponse, type LoginData } from "tasknest-schemas";

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  const navigate = useNavigate()

  const logIn = async (loginData: LoginData) => {
    await axios.post(`${process.env.BUN_PUBLIC_API_URL}/auth/login`, loginData)
      .then(response => {
        localStorage.setItem('tasknest-token', zJwtResponse.parse(response.data).accessToken)
        navigate('/')
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          alert('Invalid credentials')
        } else {
          console.error({ error })
          alert("Failed to log in due to an unknown error")
        }
      })
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm logIn={logIn} />
      </div>
    </div>
  )
}
