import * as BooksAPI from "../BooksAPI";
import {useEffect, useState} from "react";
import UpdateBook from "./UpdateBook";
import {Link} from "react-router-dom";

const SearchBook = ({books = [], onUpdate}) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        let active = true;
        const q = query.toLowerCase().trim();
        if (q === "") {
            setResults([]);
            return () => {
                active = false;
            };
        }

        BooksAPI.search(q, 10)
            .then((res) => {
                if (!active) return;
                if (res && !res.error) {
                    const merged = res.map((r) => {
                        const existing = books.find((b) => b.id === r.id);
                        return {...r, shelf: existing ? existing.shelf : "none"};
                    });
                    setResults(merged);
                } else {
                    setResults([]);
                }
            })
            .catch(() => {
                if (active) setResults([]);
            });

        return () => {
            active = false;
        };
    }, [query, books]);

    const clearQuery = () => {
        setQuery("");
        setResults([]);
    };

    const handleUpdate = (book, newShelf) => {
        // update local search results
        setResults((prev) => prev.map((r) => (r.id === book.id ? {...r, shelf: newShelf} : r)));
        // propagate to App so the main list re-renders
        if (typeof onUpdate === "function") onUpdate(book, newShelf);
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/" onClick={clearQuery}>
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="search-books-results">
                <ol className="books-grid">
                    {results.map((book) => (
                        <li key={book.id || book.title}>
                            <div className="book">
                                <div className="book-top">
                                    <div
                                        className="book-cover"
                                        style={{
                                            width: 128,
                                            height: 193,
                                            backgroundImage: `url("${book.imageLinks?.thumbnail || ""}")`,
                                        }}
                                    />
                                    {/* UpdateBook will call the passed onUpdate which updates both search results and App state */}
                                    <UpdateBook book={book} onUpdate={handleUpdate}/>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">
                                    {Array.isArray(book.authors) ? book.authors.join(", ") : ""}
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default SearchBook;
