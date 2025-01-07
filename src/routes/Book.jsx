import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, CardMedia } from '@mui/material';
import useAxios from '../services/useAxios';

function Book() {
  const { id } = useParams(); // Get the book ID from the URL.
  const { data, loading, alert, get } = useAxios('http://localhost:3000');
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBook = async () => {
    await get(`books/${id}`); // Fetch book details by ID.
  };

  useEffect(() => {
    if (data) {
      setBook(data);
    }
  }, [data]);

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
      {loading ? (
        <CircularProgress sx={{ margin: '50vh' }} />
      ) : (
        book && (
          <Box>
            <CardMedia
              sx={{ height: 400, width: 'auto', margin: 'auto' }}
              image={book.img}
              title={book.name}
            />
            <Typography variant="h3" sx={{ mt: 2 }}>
              {book.name}
            </Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              {book.author}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {book.description}
            </Typography>
          </Box>
        )
      )}
    </Box>
  );
}

export default Book;
