import React from 'react';

const SearchTest = () => {
  const apikey = '2c69b2ac40b4e3cb388a9da3bb19bdc2';

  const retrieveResults = (e) => {
    e.preventDefault();

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=jurassic&page=1&include_adult=false`)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => err.send())
  }

  return(
    <div>
      <button onClick={retrieveResults}>SearchTest Button</button>
    </div>
  )
}

export default SearchTest;