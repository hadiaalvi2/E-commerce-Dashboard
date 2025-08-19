"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingBar() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleStart = () => {
      setLoading(true)
      setProgress(0)
    }

    const handleComplete = () => {
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 200)
    }

    const handleError = () => {
      setLoading(false)
      setProgress(0)
    }

    // Simulate progress during loading
    let interval: NodeJS.Timeout
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev
          return prev + Math.random() * 10
        })
      }, 100)
    }

    // Note: In a real Next.js app with pages router, you'd use:
    // router.events.on('routeChangeStart', handleStart)
    // router.events.on('routeChangeComplete', handleComplete)
    // router.events.on('routeChangeError', handleError)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [loading])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 h-1 bg-background"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/60"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
    