import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

const TONES = [
  { id: 'casual', label: 'Casual', emoji: '😊' },
  { id: 'professional', label: 'Professional', emoji: '💼' },
  { id: 'witty', label: 'Witty', emoji: '😏' },
  { id: 'poetic', label: 'Poetic', emoji: '✨' },
  { id: 'instagram', label: 'Instagram', emoji: '📸' },
]

export default function ToneSelector({ selected, onSelect }) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {TONES.map((tone) => (
        <Chip
          key={tone.id}
          label={`${tone.emoji} ${tone.label}`}
          onClick={() => onSelect(tone.id)}
          color={selected === tone.id ? 'primary' : 'default'}
          variant={selected === tone.id ? 'filled' : 'outlined'}
          sx={{
            fontWeight: 600,
            fontSize: '0.875rem',
            py: 2.5,
            transition: 'all 0.2s',
            ...(selected === tone.id && {
              transform: 'scale(1.05)',
              boxShadow: 2,
            }),
          }}
        />
      ))}
    </Stack>
  )
}
