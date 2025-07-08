"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Activity, Clock, User } from "lucide-react"
import { Loader } from "../../components/Loader"

export default function AuditLogPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [auditLog, setAuditLog] = useState([])
  const [loadingLog, setLoadingLog] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchAuditLog()
    }
  }, [user])

  const fetchAuditLog = async () => {
    try {
      const response = await fetch("/api/audit-log", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const data = await response.json()

      if (data.success) {
        setAuditLog(data.auditLog)
      }
    } catch (error) {
    } finally {
      setLoadingLog(false)
    }
  }

  if (loading || loadingLog) {
    return (
   <Loader />
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
            <Activity className="h-6 w-6 mr-2" />
            Audit Log
          </h1>
          <p className="mt-2 text-sm text-gray-700">Track all actions performed on listings.</p>
        </div>
      </div>

      <div className="mt-8">
        {auditLog.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No audit entries</h3>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {auditLog.map((entry, entryIdx) => (
                <li key={entry.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Activity className="h-4 w-4 text-blue-600" />
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            Listing #{entry.listingId} - {entry.action}
                          </p>
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <User className="h-3 w-3 mr-1" />
                            {entry.adminEmail}
                            {entry.changes && <span className="ml-2 text-gray-400">• Changed: {entry.changes}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(entry.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
