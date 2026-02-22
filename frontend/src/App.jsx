import { useState, useEffect, useCallback } from 'react'
import ImageUploader from './components/ImageUploader'
import ToneSelector from './components/ToneSelector'
import CaptionOutput from './components/CaptionOutput'
import History from './components/History'

const API_URL = import.meta.env.PROD
  ? 'https://captioncraft-production.up.railway.app'
  : ''

const STORAGE_KEY = 'captioncraft_history'

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveHistory(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 20)))
}

export default function App() {
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [tone, setTone] = useState('casual')
  const [caption, setCaption] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState(loadHistory)

  const handleImageSelect = useCallback((file) => {
    if (!file) {
      setImageFile(null)
      setPreview(null)
      setCaption('')
      setError('')
      return
    }
    setImageFile(file)
    setCaption('')
    setError('')
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }, [])

  const handleGenerate = async () => {
    if (!imageFile) return
    setIsLoading(true)
    setError('')
    setCaption('')

    const formData = new FormData()
    formData.append('image', imageFile)
    formData.append('tone', tone)

    try {
      const res = await fetch(`${API_URL}/api/caption`, { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || 'Something went wrong')
      }

      setCaption(data.caption)

      const newItem = { caption: data.caption, tone, preview }
      const updated = [newItem, ...history.filter((h) => h.caption !== data.caption)].slice(0, 20)
      setHistory(updated)
      saveHistory(updated)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleHistorySelect = (item) => {
    setCaption(item.caption)
    setPreview(item.preview)
    setTone(item.tone)
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-text-primary">
            Caption<span className="text-primary">Craft</span>
          </h1>
          <p className="text-text-secondary mt-2">
            Upload an image, pick a tone, get the perfect caption.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-surface rounded-xl shadow-lg p-6 flex flex-col gap-5 border border-primary-light/50">
          {/* Upload */}
          <div>
            <h2 className="font-heading text-lg font-semibold mb-3">Upload Image</h2>
            <ImageUploader onImageSelect={handleImageSelect} currentPreview={preview} />
          </div>

          {/* Tone Selector */}
          <div>
            <h2 className="font-heading text-lg font-semibold mb-3">Choose Tone</h2>
            <ToneSelector selected={tone} onSelect={setTone} />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => handleImageSelect(null)}
              className="flex-1 py-3 rounded-lg border border-primary-light text-text-primary font-semibold hover:bg-primary-bg transition-colors cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={handleGenerate}
              disabled={!imageFile || isLoading}
              className="flex-1 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? 'Generating...' : 'Generate Caption'}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Caption Output */}
          <CaptionOutput caption={caption} tone={tone} isLoading={isLoading} />
        </div>

        {/* History */}
        <div className="mt-6">
          <History items={history} onSelect={handleHistorySelect} />
        </div>

        {/* Footer */}
        <p className="text-center text-text-secondary text-xs mt-8">
          Built with Claude &mdash; Powered by Anthropic
        </p>
      </div>
    </div>
  )
}
