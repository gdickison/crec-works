/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
function SearchResults({ searchResults }) {
  return (
    <div className="search-results">
      <ul>
        {searchResults && searchResults.map(result => {
          return (
            <li key={result.id}>
              <img src={result.thumbnailUrl} alt="" />
              <p className="text-white">{result.title}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SearchResults