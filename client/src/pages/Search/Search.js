import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../../components/Navbar";
import API from "../../utils/API";
import { Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import "./Search.css";

class Search extends Component {
  state = {
    title: "",
    toResults: false,
    results: []
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {

      const title = this.state.title.trim();

      API.getNewBooks(title)
        .then(res => {

          console.log(res.data.items);

          this.setState({
            toResults: true,
            results: res.data.items
          });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    if (this.state.toResults) {
      return <Redirect to={{
        pathname: "/results",
        data: { results: this.state.results }
      }} />
    }
    return (
      <div>
        <Navbar>

          <p className="lead">

            <Link className="btn btn-default btn-lg" to="/saved" role="button">Saved Books</Link>
          </p>
        </Navbar>
        <Container>
        <img src="./img/Google_Books_logo_2015.png"/>

          <div className="row">
          <div className="col-10">
          <form>
            <Input
              value={this.state.title}
              onChange={this.handleInputChange}
              name="title"
            />

          </form>
          </div>
          <div className="col-2">
          <form>
            <FormBtn         
              onClick={this.handleFormSubmit}
              className="btn btn-info"
            >
              <i className="fa fa-search"></i>
            </FormBtn>
          </form>
          </div>
          </div>
         
          <hr className="my-4" />
        </Container>
      </div>
    );
  }
}

export default Search;
