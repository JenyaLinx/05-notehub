import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination/pagination";
import { keepPreviousData } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "../../services/noteService";

import NoteList from "../NoteList/notelist";
import SearchBox from "../SearchBox/searchbox";
import Modal from "../Modal/modal";
import NoteForm from "../NoteForm/noteform";

import css from "./App.module.css";


export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
  queryKey: ["notes", page, search],
  queryFn: () => fetchNotes(page, search),
  placeholderData: keepPreviousData,
});

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />

       {totalPages > 1 && (
  <Pagination
    totalPages={totalPages}
    page={page}
    onChange={setPage}
  />
)}

        <button
          className={css.button}
          onClick={() => setIsOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}

      {notes.length > 0 && (
        <NoteList notes={notes} onDelete={handleDelete} />
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}