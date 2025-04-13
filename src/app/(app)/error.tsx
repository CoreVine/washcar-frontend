"use client"

import React from "react"

export default function error({ error }: { error: any }) {
  return <div>{JSON.stringify(error.message)}</div>
}
