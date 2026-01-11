import React from "react";
import UpdateBook from "./UpdateBook";
import PropTypes from "prop-types";

const BookDisply = ({books, onUpdate}) => {
    console.log("The book list", books);
    const BookRender = (shelfType) => {

        const filteredBooks = books.filter((book) => book.shelf === shelfType);
        // console.log("filterdbooks", filteredBooks);
        return (
            <div className="bookshelf">
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {filteredBooks.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                            className="book-cover"
                                            style={{
                                                width: 128,
                                                height: 193,
                                                backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                                            }}
                                        />
                                        <UpdateBook book={book}
                                                    onUpdate={onUpdate}
                                        />
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">
                                        {/*{book.authors}*/}
                                        {book.authors.join(", ")}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }

    return (
        <div className="list-books">
            {/*{console.log(book.filter((book) => book.shelf === "currentlyReading"))}*/}
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    {BookRender("currentlyReading")}
                </div>
                <div>
                    <h2 className="bookshelf-title">Want to Read</h2>
                    {BookRender("wantToRead")}
                </div>
                <div>
                    <h2 className="bookshelf-title">Read</h2>
                    {BookRender("read")}
                </div>
            </div>
        </div>
    );
}
export default BookDisply;

BookDisply.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func,
};