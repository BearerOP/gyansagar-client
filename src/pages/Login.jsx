"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Loader from "@/components/loader"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { account } from "@/services/appwrite"
import fetchUserDetails from "@/services/fetchUserDetails"
import { useAuth } from "@/context/AuthContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export default function Login() {
  const [role, setRole] = useState("user")
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isGithubLoading, setIsGithubLoading] = useState(false)
  const { login } = useAuth()

  const handleGithubLogin = async () => {
    try {
      setIsGithubLoading(true)
      console.log("Github login")
      await account.createOAuth2Session(
        'github',
        'https://gyansagar-client.vercel.app',
        'https://gyansagar-client.vercel.app/abc'
      )
      const user = await fetchUserDetails()
      if (user) {
        login({ ...user, role }) // Call the login function with role
      } else {
        // console.error("No user found after login.")
      }
    } catch (error) {
      console.error("GitHub login failed", error)
    } finally {
      setIsGithubLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true)
      console.log("Google login")
      await account.createOAuth2Session(
        'google',
        import.meta.env.VITE_APP_BASE_FRONTEND_URL,
        `${import.meta.env.VITE_APP_BASE_FRONTEND_URL}/abc`
      )
      const user = await fetchUserDetails()
      if (user) {
        login({ ...user, role }) // Call the login function with role
        // console.log("User successfully logged in")
      } else {
        console.error("No user found after login.")
      }
    } catch (error) {
      console.error("Google login failed", error)
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_var(--tw-gradient-stops))] from-purple-600/30 via-purple-800/20 to-transparent" />

      {/* Back to Home Link */}
      <Link 
        to="/" 
        className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 transition-all text-white text-sm font-medium px-4 py-2 rounded-full"
      >
        ← Back to Home
      </Link>

      <Card className="w-full max-w-md mx-4 bg-black/30 backdrop-blur-sm shadow-xl border border-gray-500/30 relative z-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">Create an Account</CardTitle>
          <CardDescription className="text-center text-purple-200">Sign up to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={setRole} defaultValue={role}>
              <SelectTrigger className="w-full bg-white/5 border-gray-500/30 text-white">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-white border-gray-500/30">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="w-full bg-transparent border-gray-500/30 text-white hover:bg-white/30 transition-all duration-500 ease-in-out"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up with Google...
                </>
              ) : (
                <>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full bg-transparent border-gray-500/30 text-white hover:bg-white/30 transition-all duration-500 ease-in-out"
              onClick={handleGithubLogin}
              disabled={isGithubLoading}
            >
              {isGithubLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up with Github...
                </>
              ) : (
                <>
                  <GitHubLogoIcon className="mr-2 h-4 w-4" />
                  Sign up with GitHub
                </>
              )}
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-purple-300">
            © 2024 Gyan Sagar. All rights reserved.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
