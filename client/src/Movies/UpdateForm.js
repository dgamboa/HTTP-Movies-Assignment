import axios from 'axios';
import React, { useState, useEffect } from 'react'

const initialValues = {
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

export default function UpdateForm(props) {
  const [formValues, setFormValues] = useState(initialValues);
  const id = props.match.params.id;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setFormValues(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

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
  
  const handleMovieUpdate = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleMovieUpdate}>
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
        <button>Update</button>
      </form>
    </div>
  )
}
