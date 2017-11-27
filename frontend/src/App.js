import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import "./App.css";

// My awesome styled component
const Wrapper = styled.div`
  color: red;
`;

class App extends Component {
  static propTypes = {
    data: PropTypes.shape({
      locations: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string
        })
      )
    })
  };

  state = {
    input: ""
  };

  clickHandler = () => {
    const { input } = this.state;
    const { mutate } = this.props;
    mutate({
      variables: { locationTitle: input }
    });
  };

  inputChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  render() {
    const { data: { location, loading } } = this.props;
    if (loading) return null;

    return (
      <Wrapper>
        <div>Locations: {location.map(l => l.title)}</div>
        <div>
          <input
            type="text"
            value={this.state.input}
            onChange={this.inputChange}
          />
        </div>
        <div>
          <button onClick={this.clickHandler}>Kuikka</button>
        </div>
      </Wrapper>
    );
  }
}

// GraphQL

// Query from server
const query = gql`
  query TodoAppQuery {
    location {
      title
    }
  }
`;

// Call mutation
const mutation = gql`
  mutation fakeNews($locationTitle: String!) {
    fakeNews(title: $locationTitle) {
      title
    }
  }
`;

// Update local cache
const update = {
  options: {
    update: (proxy, { data: { fakeNews } }) => {
      // Get current data
      const data = proxy.readQuery({ query });

      // write changes
      proxy.writeQuery({
        query,
        data: {
          ...data,
          location: fakeNews
        }
      });
    }
  }
};

export default compose(graphql(query), graphql(mutation, update))(App);
