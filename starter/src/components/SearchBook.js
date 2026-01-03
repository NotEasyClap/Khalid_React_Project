import BookDisply from "./BookDisply";

const SearchBook = props => {
    return (
        <div className="search-book">
            <BookDisply book={props.book} />
        </div>
    );
}

export default SearchBook;