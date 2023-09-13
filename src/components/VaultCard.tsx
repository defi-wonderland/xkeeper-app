import { Box, Card, Typography } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EastIcon from '@mui/icons-material/East';

import { RelayChip } from '~/components';

interface VaultCardProps {
  name: string;
  address: string;
  relays: string[];
}

export const VaultCard = ({ name, address, relays }: VaultCardProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexdirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '72rem',
        margin: '2rem auto',
      }}
    >
      <Card variant='outlined' sx={{ p: '2rem', gap: '2rem', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box
          component='div'
          sx={{
            gap: '2rem',
            display: 'flex',
            flexDirection: 'row',
            fontSize: '1.4rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography component={'span'} variant='h5'>
            {name}
          </Typography>

          <EmojiEmotionsIcon fontSize='large' />
        </Box>
        <Typography component={'span'} variant='h5'>
          {address}
        </Typography>
        <Box
          component='div'
          sx={{
            gap: '2rem',
            display: 'flex',
            flexDirection: 'row',
            fontSize: '1.4rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '0.6rem',
            }}
          >
            {relays.map((relayName) => (
              <RelayChip text={relayName} key={relayName} />
            ))}
          </Box>
          <EastIcon fontSize='large' />
        </Box>
      </Card>
    </Box>
  );
};
