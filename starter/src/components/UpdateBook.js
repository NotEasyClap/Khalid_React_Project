import React, {useState, useEffect} from "react";
import {update} from "../BooksAPI";
import PropTypes from "prop-types";

const UpdateBook = ({book, onUpdate}) => {
    const [shelf, setShelf] = useState(book.shelf || "none");

    useEffect(() => {
        setShelf(book.shelf || "none");
    }, [book.shelf]);

    const handleChange = (e) => {
        const value = e.target.value;
        setShelf(value);

        update(book, value)
            .then(() => {
                onUpdate(book, value);
            }).catch((error) => {
            console.error("Error updating book shelf:", error);
        });
    }
    return (
        <div className="book-shelf-changer">
            <select value={shelf} onChange={handleChange}>
                <option value="none" disabled>
                    Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    );
}

export default UpdateBook;

UpdateBook.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdate: PropTypes.func,
};