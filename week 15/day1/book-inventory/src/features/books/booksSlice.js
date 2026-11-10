import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  books: [
    {
      id: 1,
      title: "Harry Potter",
      author: "J.K. Rowling",
      genre: "Fantasy"
    },
    {
      id: 2,
      title: "Dracula",
      author: "Bram Stoker",
      genre: "Horror"
    },
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction"
    }
  ]
};
const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {}
});

export default booksSlice.reducer;