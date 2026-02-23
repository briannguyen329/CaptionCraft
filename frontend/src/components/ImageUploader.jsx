import { useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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
      <Card sx={{ position: 'relative', borderRadius: 2, border: 2, borderColor: 'primary.light' }}>
        <CardMedia
          component="img"
          image={currentPreview}
          alt="Upload preview"
          sx={{ maxHeight: 280, objectFit: 'cover' }}
        />
        <IconButton
          onClick={() => onImageSelect(null)}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255,255,255,0.9)',
            '&:hover': { bgcolor: 'background.paper' },
            boxShadow: 2,
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Card>
    )
  }

  return (
    <Box
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        borderRadius: 2,
        border: 2,
        borderStyle: 'dashed',
        borderColor: isDragging ? 'primary.main' : 'primary.light',
        bgcolor: isDragging ? 'primary.light' : 'background.default',
        p: 5,
        transition: 'all 0.2s',
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        '&:hover': { borderColor: 'primary.main' },
      }}
    >
      <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.light' }}>
        <CloudUploadIcon sx={{ color: 'primary.main' }} />
      </Avatar>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body1" color="text.primary" fontWeight={500}>
          Drop image or{' '}
          <Button
            component="label"
            variant="text"
            sx={{ fontWeight: 600, textTransform: 'none', p: 0, minWidth: 'auto', verticalAlign: 'baseline' }}
          >
            Browse
            <input
              type="file"
              hidden
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileInput}
            />
          </Button>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Supports JPG, PNG, WebP &mdash; max 25 MB
        </Typography>
      </Box>
    </Box>
  )
}
