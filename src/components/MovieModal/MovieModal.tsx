import { createPortal } from "react-dom";
import { useEffect } from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root")!;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdrop}>
      <div className={css.modal}>
        <button
          className={css.close}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />

        <h2>{movie.title}</h2>

        <p>Release date: {movie.release_date}</p>

        <p>Rating: {movie.vote_average}</p>

        <p>{movie.overview}</p>
      </div>
    </div>,
    modalRoot
  );
}