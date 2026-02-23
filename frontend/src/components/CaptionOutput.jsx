import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'

export default function CaptionOutput({ caption, tone, isLoading }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
        <CircularProgress size={20} />
        <Typography variant="body2" color="text.secondary">
          Crafting your caption...
        </Typography>
      </Box>
    )
  }

  if (!caption) return null

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 3,
        animation: 'fadeIn 0.3s ease-in',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Chip
            label={tone}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mb: 2, textTransform: 'capitalize', fontWeight: 600 }}
          />
          <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.7, fontSize: '1.125rem' }}>
            {caption}
          </Typography>
        </Box>
        <IconButton
          onClick={handleCopy}
          size="small"
          color={copied ? 'primary' : 'default'}
          aria-label="Copy caption"
        >
          {copied ? <CheckIcon /> : <ContentCopyIcon />}
        </IconButton>
      </Box>
    </Paper>
  )
}
