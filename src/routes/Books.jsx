import { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardMedia, Button, CircularProgress, Stack, Rating, Chip, Typography, Alert, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import useAxios from '../services/useAxios';

function Books() {
  const { data, loading, alert, get } = useAxios('http://localhost:3000');
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (books.length === 0) {
      fetchBooks();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBooks = async () => {
    await get('books');
  };

  useEffect(() => {
    if (data) {
      setBooks(data);
    }
  }, [data]);

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
      {loading && <CircularProgress sx={{ margin: '50vh' }} />}
      {!loading && (
        <div>
          <TextField
            label="Search Books"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredBooks.map((book) => (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={book.id}
              >
                <CardMedia sx={{ height: 250 }} image={book.img} title={book.name} />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip key={i} label={genre} variant="outlined" size="small" />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  <Rating name="read-only" value={book.stars} readOnly size="small" />
                  {/* Add navigation link to view details */}
                  <Button size="small" component={Link} to={`/book/${book.id}`}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
