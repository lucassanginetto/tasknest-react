import axios from "axios"
import { useNavigate } from "react-router-dom"

import { zUserResponse, type SignupData } from "tasknest-schemas"

import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  const navigate = useNavigate()

  const signUp = async (signupData: SignupData) => {
    await axios.post(`${process.env.BUN_PUBLIC_API_URL}/auth/signup`, signupData)
      .then(response => {
        zUserResponse.parse(response.data)
        navigate('/login')
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          alert("A user with this email already exists")
        } else {
          console.error({ error })
          alert("Failed to log in due to an unknown error")
        }
      })
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm signUp={signUp} />
      </div>
    </div>
  )
}
