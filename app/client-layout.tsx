"use client"

import { type ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Notification } from "@/components/notification"
import { useNotificationStore } from "@/lib/store"
import "./globals.css"

function NotificationWrapper() {
  const { message, type, show, hideNotification } = useNotificationStore()

  if (!show) return null 

  return (
    <Notification 
      message={message} 
      type={type} 
      show={show} 
      onClose={hideNotification} 
    />
  )
}

type ClientLayoutProps = {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <NotificationWrapper />
    </ThemeProvider>
  )
}