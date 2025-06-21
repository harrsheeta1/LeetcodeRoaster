"use client";
import React from 'react'
import { useState,useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
const page = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [roast, setRoast] = useState<string | null>(null);
  const getRoastFromGPT = async (userData: any) => {
    const prompt = `
You are a sarcastic Bollywood-style roaster 🤣🔥. Based on this user's LeetCode stats:
- Total Solved: ${userData.totalSolved}
- Ranking: ${userData.ranking}
- Contribution Points: ${userData.contributionPoints}
- Acceptance Rate: ${userData.acceptanceRate}%
- Total Submissions: ${userData.totalSubmission}
- Easy: ${userData.easySolved}/${userData.totalEasy}
- Medium: ${userData.mediumSolved}/${userData.totalMedium}
- Hard: ${userData.hardSolved}/${userData.totalHard}

Generate a happy, funny roast with:
- 15 lines
- Sarcastic, fun, Bollywood-style comments
- Use emojis, punchlines, dramatic exaggeration
`

    const res = await fetch("/api/gpt-roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })

    const data = await res.json()
    return data.roast
  }


const handleRoast = async () => {
    if (!username.trim()) return
    setLoading(true)
    setRoast(null)

    try {
      const statsRes = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
      const stats = await statsRes.json()

      if (stats.status === 'error') {
        setRoast("👀 Username not found. Even LeetCode has disowned you.")
      } else {
         const roastText = await getRoastFromGPT(stats)
         setRoast(roastText)
      }
    } catch (err) {
      setRoast("💥Server exploded! Maybe your code did it.")
    } finally {
      setLoading(false)
    }
  }
  return (

<>
<div className="min-h-screen flex flex-col items-center justify-start pt-24 px-4 text-center space-y-6">
  {/* Title always visible at top */}
  <h1 className="text-4xl sm:text-5xl font-extrabold my-heading">
    <span className="animate-bounce inline-block text-5xl sm:text-6xl mr-2">🔥</span>
    LeetCode Roaster
  </h1>
  <h2 className="text-4xl sm:text-3xl my-heading">Get ready to Roast!!</h2>

  {/* Username Input & Button */}
  <div className="flex flex-col sm:flex-row items-center gap-4 w-[350px] max-w-md">
    <Input
      className="w-full text-black placeholder-gray-500"
      placeholder="Enter your LeetCode username....."
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <Button onClick={handleRoast} disabled={loading} className="w-full sm:w-auto">
      {loading ? "Roasting..." : "Roast Me!"}
    </Button>
  </div>


  {roast && (
    <Card className="bg-white/70 backdrop-blur mt-4 max-w-3xl w-full">
      <CardContent className="p-6 text-left whitespace-pre-line text-sm sm:text-base font-medium">
        {roast}
      </CardContent>
    </Card>
  )} 

</div>
</>
  )
}

export default page
