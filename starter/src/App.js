import "./App.css";
import {useEffect, useState} from "react";
import * as BooksAPI from "./BooksAPI";
import BookDisply from "./components/BookDisply";
import SearchBook from "./components/SearchBook";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const loadBooks = async () => {
            const all = await BooksAPI.getAll();
            setBooks(all);
        };
        loadBooks();
    }, []);

    const handleUpdate = async (book, newShelf) => {
        try {
            await BooksAPI.update(book, newShelf);
            setBooks((prev) => {
                const exists = prev.find((b) => b.id === book.id);
                if (exists) {
                    return prev
                        .map((b) => (b.id === book.id ? {...b, shelf: newShelf} : b))
                        .filter((b) => !(newShelf === "none" && b.id === book.id));
                } else {
                    if (newShelf === "none") return prev;
                    return [...prev, {...book, shelf: newShelf}];
                }
            });
        } catch (err) {
            console.error("Failed to update book:", err);
        }
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/search"
                    element={<SearchBook books={books} onUpdate={handleUpdate}/>}
                />
                <Route
                    path="/"
                    element={
                        <div className="list-books">
                            <BookDisply books={books} onUpdate={handleUpdate}/>
                            <div className="open-search">
                                <Link to="/search">Add a book</Link>
                            </div>
                        </div>
                    }
                />
            </Routes>
        </Router>

    );
}

export default App;