import React from "react";
import styled from "styled-components";
import "normalize.css";
import { Route, Routes } from "react-router-dom";
import HeaderContainer from "containers/HeaderContainer";
import SubNav from "components/search-subnav/SubNav";
import IssuesTable from "components/issues-table/IssuesTable";
import IssuesDetail from "components/issue-detail/IssueDetail";

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

      <Routes>
        <Route exact path="/" element={<IssuesTable />} />
        <Route path="/:id" element={<IssuesDetail />} />
        <Route path="*" element={<IssuesTable />} />
      </Routes>
    </IssueListingContainer>
  </Container>
);

export default App;
