export default function History({ items, onSelect }) {
  if (items.length === 0) return null

  return (
    <div className="bg-white rounded-xl p-5 border border-primary-light">
      <h3 className="font-heading font-semibold text-sm text-text-secondary mb-3">
        Recent Captions
      </h3>
      <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => onSelect(item)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary-bg transition-colors text-left cursor-pointer"
          >
            <img
              src={item.preview}
              alt=""
              className="w-10 h-10 rounded-md object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-primary font-semibold capitalize">{item.tone}</p>
              <p className="text-sm text-text-primary truncate">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
