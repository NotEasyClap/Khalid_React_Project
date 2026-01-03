import Book from "./Book";

const UpdateBook = ({ books }) => {
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <Book book={book} />
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default UpdateBook;