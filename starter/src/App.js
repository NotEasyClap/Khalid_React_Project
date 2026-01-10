import "./App.css";
import {useEffect, useState} from "react";
import * as BooksAPI from "./BooksAPI";
import BookDisply from "./components/BookDisply";
import SearchBook from "./components/SearchBook";

// import {Route, Routes} from "react-router-dom";

function App() {
    const [showSearchPage, setShowSearchpage] = useState(false);
    // const [shelf, setShelf] = useState("None");
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const loadBooks = async () => {
            const books = await BooksAPI.getAll();
            setBooks(books);
        };
        loadBooks();
    }, []);

    console.log(books);
    // const BookTypes = () => {
    //     const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
    //     // const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    //     // const read = books.filter((book) => book.shelf === "read");
    // }
    return (
        // Routes can be used for multiple pages if needed in future
        /**
         * Routes>
         *     <Route path="/" element={ ... } />
         *     <Route path="/search" element={ ... } />
         * </Routes>
         * */
        <div className="app">
            {showSearchPage ? (
                <div className="search-books">
                    <div className="search-books-bar">
                        <a
                            className="close-search"
                            onClick={() => setShowSearchpage(!showSearchPage)}
                        >
                            Close
                        </a>
                        <div className="search-books-input-wrapper">
                            <input
                                type="text"
                                placeholder="Search by title, author, or ISBN"
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid"><SearchBook books={books}/></ol>
                    </div>
                </div>
            ) : (

                <div className="list-books">
                    {/*{console.log(books.filter((book) => book.shelf === "currentlyReading"))}*/}
                    {/*{console.log("The typeof ", typeof (books))}*/}
                    {/*{console.log('The book list',*/}
                    {/*    books.forEach((book) => {*/}
                    {/*        console.log(book);*/}
                    {/*    })*/}
                    {/*)}*/}

                    <BookDisply books={books}/>
                    <div className="open-search">
                        <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
