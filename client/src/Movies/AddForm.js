import axios from 'axios';
import React, { useState } from 'react'

const initialValues = {
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

export default function AddForm(props) {
  const [formValues, setFormValues] = useState(initialValues);

  const valueToUpdateFilter = (e) => {
    switch (e.target.name) {
      case("metascore"):
        return parseInt(e.target.value) || 0;
      case("stars"):
        return e.target.value.split(",");
      default:
        return e.target.value;
    }
  }

  const handleChange = (e) => {
    const valueToUpdate = valueToUpdateFilter(e);
    setFormValues({
      ...formValues,
      [e.target.name]: valueToUpdate
    });
  };
  
  const handleMovieAdd = (e) => {
    e.preventDefault();
    
    const newMovie = {
      ...formValues,
      stars: formValues.stars.map(s => s.trim())
    };

    axios.post(`http://localhost:5000/api/movies`, newMovie)
      .then(res => {
        props.setMovieList(res.data);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <div>
      <h2>Add a Movie</h2>
      <form onSubmit={handleMovieAdd}>
        <input
          type="text"
          name="title"
          value={formValues.title}
          placeholder="Movie title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          value={formValues.director}
          placeholder="Director"
          onChange={handleChange}
        />
        <input
          type="number"
          name="metascore"
          value={formValues.metascore}
          placeholder="Metascore"
          onChange={handleChange}
        />
        <input
          type="text"
          name="stars"
          value={formValues.stars}
          placeholder="Separate stars with commas"
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
    </div>
  )
}
