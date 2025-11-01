import React from 'react'
import { Link } from 'react-router-dom'

const ToolCard = ({ title, description, icon: Icon, href, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200',
    green: 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200',
    red: 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200',
  }

  return (
    <Link
      to={href}
      className={`tool-card block p-6 rounded-lg border-2 transition-all duration-300 ${colorClasses[color]}`}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-white">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default ToolCard
