export const SearchBar = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-12">
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Wyszukaj oferty dla ciebie"
              aria-label="Search"
            />
            <button class="btn btn-outline-info" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
