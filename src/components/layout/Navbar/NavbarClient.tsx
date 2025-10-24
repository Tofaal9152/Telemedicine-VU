"use client"

import type React from "react"

const NavbarClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sticky top-0 left-0 right-0 z-50 w-full  bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 shadow-sm">
      {children}
    </div>
  )
}

export default NavbarClient
