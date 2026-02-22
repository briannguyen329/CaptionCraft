const TONES = [
  { id: 'casual', label: 'Casual', emoji: '😊' },
  { id: 'professional', label: 'Professional', emoji: '💼' },
  { id: 'witty', label: 'Witty', emoji: '😏' },
  { id: 'poetic', label: 'Poetic', emoji: '✨' },
  { id: 'instagram', label: 'Instagram', emoji: '📸' },
]

export default function ToneSelector({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TONES.map((tone) => (
        <button
          key={tone.id}
          onClick={() => onSelect(tone.id)}
          className={`
            px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer
            ${selected === tone.id
              ? 'bg-primary text-white shadow-md scale-105'
              : 'bg-white text-text-primary border border-primary-light hover:border-primary hover:bg-primary-bg'
            }
          `}
        >
          {tone.emoji} {tone.label}
        </button>
      ))}
    </div>
  )
}
