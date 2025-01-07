import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { DateField } from '@mui/x-date-pickers/DateField';
import useAxios from '../services/useAxios';
import { bookGenres } from '../genres';
import { Stack, Typography } from '@mui/material';

function AddBook() {
  const { alert, post } = useAxios('http://localhost:3000');
  const [rateValue, setRateValue] = useState(3);
  const [hoverValue, setHoverValue] = useState(-1);
  const [book, setBook] = useState({
    author: '',
    name: '',
    genres: [],
    completed: false,
    start: null,
    end: null,
    stars: null,
  });

  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const rateChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      stars: value,
    });
  };

  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox' && name === 'completed') {
      setBook({ ...book, [name]: checked });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  function postHandler(e) {
    e.preventDefault();
    post('books', { ...book, stars: rateValue });
  }

  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: 'auto', width: '25%' }}
      >
        {alert.show && (
          <Alert severity={alert.type} sx={{ animation: 'fadeIn 0.5s' }}>
            {alert.message}
          </Alert>
        )}

        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>

        <TextField name="name" label="Title" variant="outlined" />
        <TextField name="author" label="Author" variant="outlined" />
        <TextField name="img" label="Image (url)" variant="outlined" />

        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={book.genres}
          name="genres"
          onChange={genreChangeHandler}
          input={<OutlinedInput label="Genre" />}
        >
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        <DateField name="start" label="Started" />
        <DateField name="end" label="Finished" disabled={!book.completed} />

        <Stack spacing={1} alignItems="center">
          <Typography variant="body1">
            Current Rating: {hoverValue !== -1 ? hoverValue : rateValue}
          </Typography>
          <Rating
            name="stars"
            value={rateValue}
            size="large"
            onChange={(event, newValue) => {
              setRateValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHoverValue(newHover);
            }}
            onMouseLeave={() => setHoverValue(-1)}
          />
        </Stack>

        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
