import React, { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Characters from "./components/Characters";
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";
import Loading from "./components/Loading";
import CharacterModal from "./components/CharacterModal";
import Footer from "./components/Footer";
import "./App.css";

const BASE_API_URL = "https://rickandmortyapi.com/api/character";

function App() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [searchName, setSearchName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal de detalle
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Construir URL con parámetros
  const buildUrl = useCallback(
    (pageNumber = 1) => {
      const params = new URLSearchParams();
      params.append("page", pageNumber);
      if (searchName.trim()) params.append("name", searchName.trim());
      if (status) params.append("status", status);
      if (gender) params.append("gender", gender);

      return `${BASE_API_URL}/?${params.toString()}`;
    },
    [searchName, status, gender]
  );

  // Función para consumir la API
  const fetchCharacters = useCallback(async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.results) {
        setCharacters(data.results);
        setInfo(data.info || {});
      } else {
        // La API devuelve status 404 con { error: "There is nothing here" } si no hay coincidencias
        setCharacters([]);
        setInfo({});
        setError("No se encontraron personajes con los filtros seleccionados.");
      }
    } catch (err) {
      console.error("Error al obtener personajes:", err);
      setError("Ocurrió un error al conectar con el multiverso. Revisa tu conexión a internet.");
      setCharacters([]);
      setInfo({});
    } finally {
      setLoading(false);
    }
  }, []);

  // Efecto cuando cambian los filtros (con debounce para la búsqueda)
  useEffect(() => {
    setCurrentPage(1);
    const timeoutId = setTimeout(() => {
      const url = buildUrl(1);
      fetchCharacters(url);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [buildUrl, fetchCharacters]);

  // Manejo de paginación
  const handlePrevious = () => {
    if (info.prev) {
      const newPage = Math.max(1, currentPage - 1);
      setCurrentPage(newPage);
      fetchCharacters(info.prev);
    }
  };

  const handleNext = () => {
    if (info.next) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      fetchCharacters(info.next);
    }
  };

  const handleResetFilters = () => {
    setSearchName("");
    setStatus("");
    setGender("");
    setCurrentPage(1);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar brand="Rick and Morty Multiverse" />

      <main className="container my-5 flex-grow-1">
        {/* Encabezado / Hero */}
        <div className="text-center mb-5">
          <h1 className="fw-extrabold display-5 mb-2" style={{ fontWeight: 800 }}>
            Explorador de <span style={{ color: "var(--rm-green)" }}>Rick &amp; Morty</span>
          </h1>
          <p className="text-muted lead mx-auto" style={{ maxWidth: "600px" }}>
            Busca y filtra personajes del multiverso de Rick y Morty en tiempo real. Consulta detalles, dimensiones de origen y episodios.
          </p>
        </div>

        {/* Panel de Filtros */}
        <Filters
          searchName={searchName}
          setSearchName={setSearchName}
          status={status}
          setStatus={setStatus}
          gender={gender}
          setGender={setGender}
          onReset={handleResetFilters}
          totalResults={info.count}
        />

        {/* Estado de Carga */}
        {loading && <Loading />}

        {/* Estado de Error o Sin Resultados */}
        {!loading && error && (
          <div className="text-center py-5">
            <div style={{ fontSize: "3rem" }}>🛸</div>
            <h4 className="text-light mt-3 fw-bold">{error}</h4>
            <p className="text-muted">Intenta cambiar los términos de búsqueda o limpiar los filtros.</p>
            <button
              type="button"
              className="btn btn-outline-info rounded-pill px-4 mt-2"
              onClick={handleResetFilters}
            >
              Restablecer Filtros
            </button>
          </div>
        )}

        {/* Cuadrícula de Personajes */}
        {!loading && !error && (
          <>
            <Characters
              characters={characters}
              onSelectCharacter={(character) => setSelectedCharacter(character)}
            />

            <Pagination
              prev={info.prev}
              next={info.next}
              onPrevious={handlePrevious}
              onNext={handleNext}
              currentPage={currentPage}
              totalPages={info.pages || 1}
            />
          </>
        )}
      </main>

      {/* Modal de Detalle */}
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
