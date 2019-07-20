import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import BookBtn from "../../components/BookBtn";
import Navbar from "../../components/Navbar";
import API from "../../utils/API";


class Results extends Component {
  state = {
    books: [],
    target: "",
    noResults: false
  };

  componentDidMount() {
    const data = this.props.location.data
    if (data && data.results.length > 0) {

      this.setState({
        books: data.results.filter((value, index) => index < 5),
        target: "_blank"
      });
    } else {
      this.setState({
        noResults: true
      });
    }
  }

  saveBook = book => {
    API.saveBook(book)
      .then(res => {
        const currentBooks = this.state.books;
        const filterBooks = currentBooks.filter(book => book.id !== res.data.id);
        this.setState({
          books: filterBooks
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.noResults) {
      return (
        <div>
        <Navbar>

          <p className="lead">

            <Link className="btn btn-default btn-lg" to="/saved" role="button">Saved Books</Link>
          </p>
        </Navbar>
        <Container>
        <img src="./img/Google_Books_logo_2015.png" />
       
          <hr className="my-4" />
          <Link to="/">No results - click here to search again.<i class="fa fa-arrow-left" aria-hidden="true"></i></Link>
        </Container>
      </div>

      )
    }
    return (

      <div>
      <Navbar>

        <p className="lead">
          <Link className="btn btn-default btn-lg" to="/saved" role="button">Saved Books</Link>
        </p>
      </Navbar>
      <Container>
      <img src="./img/Google_Books_logo_2015.png" />
     
        <hr className="my-4" />
        <Link className="btn btn-default btn-lg" to="/" role="button"><i class="fa fa-arrow-left" aria-hidden="true"></i> Search Again</Link>
          <List>
            {this.state.books.map((book, index) => (
              <ListItem key={book.id}>
                <div className="date-div">
                  <a
                    key={"" + index + book.id}
                    href={book.volumeInfo.infoLink}
                    target={this.state.target}
                  >
                    {book.volumeInfo.title}
                  </a>
                    <p>Author: {book.volumeInfo.authors[0]}</p>
                  <p>
                  <img align="left" style={{paddingRight:10}}
                    src={book.volumeInfo.imageLinks.smallThumbnail} alt="new"
                  />
                    {book.volumeInfo.description}
                  </p>
                </div>
                <div className="book-btn-div">
                  <BookBtn
                    key={"" + book.id + index}
                    btntype="info"
                    disabled={book.volumeInfo.infoLink === "/"}
                    onClick={() => this.saveBook({
                      title: book.volumeInfo.title,
                      author: book.volumeInfo.authors[0],
                      description: book.volumeInfo.description,
                      image: book.volumeInfo.imageLinks.smallThumbnail,
                      link: book.volumeInfo.infoLink,
                      _id: book.id
                    })}
                  >
                    Save
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

export default Results;
