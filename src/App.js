import React from "react";
import styled from "styled-components";
import "normalize.css";
import { BrowserRouter, Router, Route } from "react-router-dom";
import HeaderContainer from "containers/HeaderContainer";
import SubNav from "components/search-subnav/SubNav";
import IssuesTable from "components/issues-table/IssuesTable";

const Container = styled.div`
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  margin: 0px;
  padding: 0px;
`;

const IssueListingContainer = styled.div`
  font-size: 14px;
  width: 88%;
  margin: 0 auto;
`;

const App = () => (
  <Container>
    <HeaderContainer />
    <IssueListingContainer>
      <SubNav />
      <BrowserRouter>
        <Router>
          <Route exact path="/" component={IssuesTable} />
          {/* <Route path="/:id" component={IssuesDetail} /> */}
          <Route path="*" component={IssuesTable} />
        </Router>
      </BrowserRouter>
    </IssueListingContainer>
  </Container>
);

export default App;
