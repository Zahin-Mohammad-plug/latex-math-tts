"use client"

import { useEffect, useState } from "react"
import packageInfo from "../package.json"

export function VersionDisplay() {
  const [version, setVersion] = useState<string>(packageInfo.version)

  // This effect will run on component mount and whenever packageInfo.version changes
  useEffect(() => {
    setVersion(packageInfo.version)
  }, [])

  return (
    <div className="fixed bottom-2 right-2 text-xs text-muted-foreground opacity-70 hover:opacity-100 transition-opacity">
      v{version}
    </div>
  )
}
