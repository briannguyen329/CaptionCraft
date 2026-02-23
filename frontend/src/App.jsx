import { useState, useCallback } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
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
    <Box sx={{ minHeight: '100vh', py: 4, px: 2, background: 'linear-gradient(135deg, #fdf6fe 0%, #f8f0fa 50%, #f0e6f6 100%)' }}>
      <Container maxWidth="sm">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1">
            Caption<Typography component="span" variant="h3" color="primary">Craft</Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Upload an image, pick a tone, get the perfect caption.
          </Typography>
        </Box>

        {/* Main Card */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Upload */}
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              Upload Image
            </Typography>
            <ImageUploader onImageSelect={handleImageSelect} currentPreview={preview} />
          </Box>

          {/* Tone Selector */}
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              Choose Tone
            </Typography>
            <ToneSelector selected={tone} onSelect={setTone} />
          </Box>

          {/* Actions */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleImageSelect(null)}
              sx={{ py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleGenerate}
              disabled={!imageFile || isLoading}
              sx={{ py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {isLoading ? 'Generating...' : 'Generate Caption'}
            </Button>
          </Stack>

          {/* Error */}
          {error && (
            <Alert severity="error">{error}</Alert>
          )}

          {/* Caption Output */}
          <CaptionOutput caption={caption} tone={tone} isLoading={isLoading} />
        </Paper>

        {/* History */}
        <Box sx={{ mt: 3 }}>
          <History items={history} onSelect={handleHistorySelect} />
        </Box>

        {/* Footer */}
        <Typography variant="caption" align="center" color="text.secondary" sx={{ mt: 4, display: 'block' }}>
          Built with Claude &mdash; Powered by Anthropic
        </Typography>
      </Container>
    </Box>
  )
}
