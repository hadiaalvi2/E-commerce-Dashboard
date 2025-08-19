"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface NotificationProps {
  message: string
  type: "success" | "info" | "warning"
  show: boolean
  onClose: () => void
}

export function Notification({ message, type, show, onClose }: NotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  const bgColor = {
    success: "bg-green-600",
    info: "bg-blue-600",
    warning: "bg-orange-600",
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-semibold shadow-lg ${bgColor[type]}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
