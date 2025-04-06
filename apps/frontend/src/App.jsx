import { Container, Typography } from '@mui/material';
import SendMessageForm from './components/SendMessageForm';

function App() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 6,
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
        py: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Telegram Message Sender
      </Typography>

      <SendMessageForm />
    </Container>
  );
}

export default App;
