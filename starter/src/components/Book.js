import BookDisply from "./BookDisply";

const Book = ({ book }) => {

    return (
        <div className="book">
            <BookDisply book={book} />
        </div>
    );
}

export default Book;