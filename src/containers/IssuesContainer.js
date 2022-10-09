/* eslint-disable no-nested-ternary */
import React, { Component, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import Issue from "../components/issues-table/Issue";
import LoaderComponent from "../components/commons/LoaderComponent";
import SomethingWentWrong from "../components/commons/SomethingWentWrong";
import { fetchGitIssues } from "store/slices/issuesSlice";

const IssuesContainerWrapper = styled.div`
  border: 1px solid #e1e4e8;
  border-collapse: collapse;
`;

const IssuesContainer = () => {
  const dispatch = useDispatch();
  const { fetching, issues, error } = useSelector((state) => state.issues);

  useEffect(() => {
    dispatch(fetchGitIssues());
  }, []);

  return (
    <div>
      {fetching ? (
        <LoaderComponent />
      ) : error ? (
        <SomethingWentWrong />
      ) : (
        <IssuesContainerWrapper>
          {!!issues &&
            issues.map((issue) => <Issue key={issue.id} issue={issue} />)}
        </IssuesContainerWrapper>
      )}
    </div>
  );
};

export default IssuesContainer;
