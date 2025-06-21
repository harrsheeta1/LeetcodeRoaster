'use client'
import { useEffect, useState } from "react"

const emojis = ['🔥', '😜', '🤣','🧠', '😎', '🤖', '😂','🙈'];


export default function FloatingEmojis() {
  const [emojiList, setEmojiList] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random().toString()
      setEmojiList((prev) => [
        ...prev,
        {
          id,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          left: Math.random() * 100,
        },
      ])

      setTimeout(() => {
        setEmojiList((prev) => prev.filter((e) => e.id !== id))
      }, 10000) // emoji disappears after 10s
    }, 3000) // spawn one every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {emojiList.map(({ id, emoji, left }) => (
        <div
          key={id}
          className="floating-emoji"
          style={{ left: `${left}%`, bottom: '-50px' }}
        >
          {emoji}
        </div>
      ))}
    </div>
  )
}
