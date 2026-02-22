import { useCallback, useState } from 'react'

export default function ImageUploader({ onImageSelect, currentPreview }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragIn = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragOut = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file)
    }
  }, [onImageSelect])

  const handleFileInput = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageSelect(file)
    }
  }, [onImageSelect])

  if (currentPreview) {
    return (
      <div className="relative rounded-lg overflow-hidden border-2 border-primary-light">
        <img
          src={currentPreview}
          alt="Upload preview"
          className="w-full max-h-[280px] object-cover"
        />
        <button
          onClick={() => onImageSelect(null)}
          className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center text-primary-dark shadow-md transition-colors cursor-pointer"
        >
          &times;
        </button>
      </div>
    )
  }

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`
        relative flex flex-col items-center justify-center gap-3
        rounded-lg border-2 border-dashed p-10 transition-all duration-200
        ${isDragging
          ? 'border-primary bg-primary-light/50 scale-[1.02]'
          : 'border-primary-light bg-primary-bg hover:border-primary/50'
        }
      `}
    >
      <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8f109b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-text-primary font-medium">
          Drop image or{' '}
          <label className="text-primary font-semibold cursor-pointer hover:underline">
            Browse
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-text-secondary text-sm mt-1">
          Supports JPG, PNG, WebP &mdash; max 25 MB
        </p>
      </div>
    </div>
  )
}
