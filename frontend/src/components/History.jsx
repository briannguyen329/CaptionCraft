import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'

export default function History({ items, onSelect }) {
  if (items.length === 0) return null

  return (
    <Paper elevation={1} sx={{ p: 2.5, borderRadius: 3 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Recent Captions
      </Typography>
      <List sx={{ maxHeight: 300, overflow: 'auto', pt: 0.5 }}>
        {items.map((item, i) => (
          <ListItemButton
            key={i}
            onClick={() => onSelect(item)}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemAvatar>
              <Avatar
                src={item.preview}
                variant="rounded"
                sx={{ width: 40, height: 40 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Chip
                  label={item.tone}
                  size="small"
                  color="primary"
                  sx={{ height: 18, fontSize: '0.7rem', textTransform: 'capitalize', fontWeight: 600 }}
                />
              }
              secondary={item.caption}
              secondaryTypographyProps={{
                noWrap: true,
                variant: 'body2',
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  )
}
