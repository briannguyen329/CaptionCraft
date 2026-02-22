import { useState } from 'react'

export default function CaptionOutput({ caption, tone, isLoading }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-primary-light">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-text-secondary text-sm">Crafting your caption...</p>
        </div>
      </div>
    )
  }

  if (!caption) return null

  return (
    <div className="bg-white rounded-xl p-6 border border-primary-light animate-[fadeIn_0.3s_ease-in]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <span className="inline-block px-2 py-0.5 rounded-full bg-primary-light text-primary text-xs font-semibold mb-3 capitalize">
            {tone}
          </span>
          <p className="text-text-primary leading-relaxed text-lg">{caption}</p>
        </div>
        <button
          onClick={handleCopy}
          className="shrink-0 p-2 rounded-lg hover:bg-primary-bg transition-colors cursor-pointer"
          title="Copy caption"
        >
          {copied ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8f109b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6c5f6c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
