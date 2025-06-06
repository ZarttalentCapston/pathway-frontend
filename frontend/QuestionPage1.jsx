
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import dotenv from "dotenv"

dotenv.config()

export default function QuestionPage1() {

  const [ role, setRole ] = useState("")
  const [ error, setError ] = useState("")
  const [ loading, setLoading ] = useState(false)

  const navigate = useNavigate()

   const API_URL = process.env.API_URL

  const handleNext = async () => {
     if(!role){
      setError("Please enter your current role or skip")
      return
     }

     try {
      setLoading(true)
      setError("")

      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/roles/current`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({ currentRole : role })
      })

      const data = await response.json()

      if(!response.ok){
        throw new Error(data.error || "something went wrong")
      }

      navigate(data.nextStep || "/question2")
     } catch (error) {
       setError(error.message)
     } finally{
      setLoading(false)
     }
  }


  const handleSkip =  () => {
     navigate("/question2")
  }

   return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl text-center">
        <div className="flex items-center gap-2 mb-4">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">What is your current role?</h1>
        <p className="text-gray-500 mb-8">If no current role, click skip</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className="space-y-8"
        >
          {error && <p className="text-red-500">{error}</p>}

          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Software Developer"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSkip}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Skip,
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Submitting...' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
