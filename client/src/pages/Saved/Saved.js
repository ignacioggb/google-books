import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Navbar from "../../components/Navbar";
import API from "../../utils/API";
import BookBtn from "../../components/BookBtn";

class Saved extends Component {
  state = {
    books: [],
    target: "",
    noResults: false
  };

  componentDidMount() {
    this.getSavedBooks();
  }

  getSavedBooks = () => {
    API.getSavedBooks()
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            books: res.data,
            target: "_blank"
          });
        } else {
          this.setState({
            noResults: true
          });
        }

      })
      .catch(err => console.log(err));
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.getSavedBooks())
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.noResults) {
      return (
        <div>
        <Navbar>

          <p className="lead">
            <Link className="btn btn-default btn-lg" to="/" role="button">New Search</Link>
            <Link className="btn btn-default btn-lg" to="/saved" role="button">Saved Books</Link>
          </p>
        </Navbar>
        <Container>
        <img src="./img/Google_Books_logo_2015.png" />
          <hr className="my-4" />
          <Link to="/">Nothing found. Click here to go back to search.</Link>
        </Container>
      </div>

      )
    }
    return (
      <div>
      <Navbar>

        <p className="lead">
          <Link className="btn btn-default btn-lg" to="/" role="button">New Search</Link>
          <Link className="btn btn-default btn-lg" to="/saved" role="button">Saved Books</Link>
        </p>
      </Navbar>
      <Container>
      <img src="./img/Google_Books_logo_2015.png" />
        <hr className="my-4" />
        <h2>Saved Books</h2>
          <List>
            {this.state.books.map(book => (
              <ListItem key={book._id}>
                <div className="date-div">
                  <a
                    key={book._id + "link"}
                    href={book.link}
                    target={this.state.target}
                  >
                    {book.title}
                  </a>
                  <p>Author: {book.author}</p>
                  <p>
                  <img align="left" style={{paddingRight:10}}
                    src={book.image} alt="new"
                  />
                    {book.description}
                  </p>
                </div>
                <div className="book-btn-div">
                  <BookBtn
                    key={book._id + "btn"}
                    btntype="info"
                    id={book._id}
                    disabled={book.link === "/"}
                    onClick={() => this.deleteBook(book._id)}
                  >
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                </BookBtn>
                </div>
              </ListItem>
            ))}
          </List>
      </Container>
    </div>


    );
  }
}

export default Saved;
