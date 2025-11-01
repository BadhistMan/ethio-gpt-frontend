import React, { useState } from 'react'
import { FileText, Download, Eye, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react'
import { api } from '../utils/api'

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: '',
    education: '',
    skills: ''
  })
  const [preview, setPreview] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generatePDF = async () => {
    if (!resumeData.name || !resumeData.email) {
      setError('Name and email are required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await api.generateResumePDF(resumeData)
      
      // Convert hex string back to bytes
      const pdfBytes = new Uint8Array(
        response.pdf_data.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
      )
      
      // Create blob and download
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = response.filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError('Failed to generate PDF. Please try again.')
      console.error('PDF generation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const PreviewResume = () => (
    <div className="bg-white p-8 border rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center border-b-2 border-ethio-green pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{resumeData.name || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          {resumeData.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{resumeData.email}</span>
            </div>
          )}
          {resumeData.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{resumeData.phone}</span>
            </div>
          )}
          {resumeData.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{resumeData.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.summary && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <User className="w-5 h-5 text-ethio-green" />
            <h2 className="text-xl font-bold text-gray-800">Professional Summary</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Briefcase className="w-5 h-5 text-ethio-green" />
            <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
          </div>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {resumeData.experience}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <GraduationCap className="w-5 h-5 text-ethio-green" />
            <h2 className="text-xl font-bold text-gray-800">Education</h2>
          </div>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {resumeData.education}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Award className="w-5 h-5 text-ethio-green" />
            <h2 className="text-xl font-bold text-gray-800">Skills</h2>
          </div>
          <div className="text-gray-700">
            {resumeData.skills.split(',').map((skill, index) => (
              <span
                key={index}
                className="inline-block bg-ethio-green text-white px-3 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const clearForm = () => {
    setResumeData({
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      experience: '',
      education: '',
      skills: ''
    })
    setError('')
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <FileText className="w-8 h-8 text-ethio-green" />
          <h1 className="text-3xl font-bold text-gray-900">AI Resume Builder</h1>
        </div>
        <p className="text-gray-600">
          Create professional resumes with AI assistance. Fill in your details and generate a polished PDF.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setPreview(false)}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              !preview 
                ? 'bg-ethio-green text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Edit Resume
          </button>
          <button
            onClick={() => setPreview(true)}
            className={`px-6 py-3 rounded-md font-medium flex items-center space-x-2 transition-colors ${
              preview 
                ? 'bg-ethio-green text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {preview ? (
        <PreviewResume />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={resumeData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={resumeData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={resumeData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green"
                    placeholder="+251 XXX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={resumeData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green"
                    placeholder="Addis Ababa, Ethiopia"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Professional Details</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Summary
                </label>
                <textarea
                  value={resumeData.summary}
                  onChange={(e) => handleChange('summary', e.target.value)}
                  className="w-full h-24 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green resize-none"
                  placeholder="Experienced professional with expertise in..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Experience
                </label>
                <textarea
                  value={resumeData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  className="w-full h-32 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green resize-none"
                  placeholder="Senior Developer, Tech Company (2020-2024)
• Led development of web applications
• Managed team of 5 developers
• Improved system performance by 40%"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <textarea
                  value={resumeData.education}
                  onChange={(e) => handleChange('education', e.target.value)}
                  className="w-full h-24 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green resize-none"
                  placeholder="BSc in Computer Science, Addis Ababa University (2016-2020)
• GPA: 3.8/4.0
• Relevant coursework: Data Structures, Algorithms, Web Development"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={resumeData.skills}
                  onChange={(e) => handleChange('skills', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green"
                  placeholder="JavaScript, Python, Project Management, Communication, Leadership"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={generatePDF}
                disabled={loading || !resumeData.name || !resumeData.email}
                className="flex-1 bg-ethio-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download PDF Resume</span>
                  </>
                )}
              </button>
              
              <button
                onClick={clearForm}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Clear Form
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* Live Preview */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Live Preview
              </label>
              <span className="text-sm text-gray-500">Updates automatically</span>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <PreviewResume />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResumeBuilder
