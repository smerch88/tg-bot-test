import { TextField, Button, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function SendMessageForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [feedback, setFeedback] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const onSubmit = async data => {
    try {
      const res = await fetch(`${API_URL}/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.description || response.error || 'Something went wrong');
      }

      setFeedback({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success',
      });

      reset();
    } catch (err) {
      setFeedback({
        open: true,
        message: `${err.message}`,
        severity: 'error',
      });
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Chat ID"
          variant="outlined"
          fullWidth
          {...register('chatId', {
            required: 'Chat ID is required',
            pattern: {
              value: /^-?\d+$/,
              message: 'Chat ID must be a number (can start with "-")',
            },
          })}
          error={!!errors.chatId}
          helperText={errors.chatId?.message}
        />

        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 3,
              message: 'Message must be at least 3 characters',
            },
          })}
          error={!!errors.message}
          helperText={errors.message?.message}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            endIcon={isSubmitting && <CircularProgress size={20} />}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={feedback.open}
        autoHideDuration={5000}
        onClose={() => setFeedback({ ...feedback, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={feedback.severity}
          onClose={() => setFeedback({ ...feedback, open: false })}
          variant="filled"
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}
