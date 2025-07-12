import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setQuery } from "../store/guidesSlice";
import "../styles/_busqueda.scss";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.guides.query);

  const [input, setInput] = useState(query);

  useEffect(() => {
    setInput(query);
  }, [query]);

  const handleSearch = () => {
    dispatch(setQuery(input.trim()));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setInput("");
    dispatch(setQuery(""));
  };

  return (
    <section className="search-section" role="search" aria-label="Buscar guía">
      <h2 className="search-section__title">Buscar guía</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por número de guía..."
          aria-label="Buscar número de guía"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-bar__input"
        />
        <button
          className="search-bar__button"
          onClick={handleSearch}
          aria-label="Buscar guía"
        >
          🔍
        </button>
      </div>

      {input && (
        <div className="search-bar__link-container">
          <button
            className="search-bar__clear-link"
            onClick={handleClear}
            aria-label="Mostrar todas las guías"
          >
            Mostrar todas las guías
          </button>
        </div>
      )}
    </section>
  );
};

export default SearchBar;
