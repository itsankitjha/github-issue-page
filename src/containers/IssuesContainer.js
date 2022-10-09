/* eslint-disable no-nested-ternary */
import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import Issue from "../components/issues-table/Issue";
import LoaderComponent from "../components/commons/LoaderComponent";
import SomethingWentWrong from "../components/commons/SomethingWentWrong";
import { fetchGitIssues } from "store/slices/issuesSlice";
import InfiniteScroll from "services/infiniteScroll/InfiniteScroll";

const IssuesContainerWrapper = styled.div`
  border: 1px solid #e1e4e8;
  border-collapse: collapse;
`;

const IssuesContainer = () => {
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const { fetching, issues, error } = useSelector((state) => state.issues);

  useEffect(() => {
    dispatch(fetchGitIssues());
  }, []);

  const fetchMoreData = () => {
    if (issues.length >= 400) {
      setHasMore(false);
      return;
    }
    dispatch(fetchGitIssues());
  };

  return (
    <div>
      {issues.length < 1 && fetching ? (
        <LoaderComponent />
      ) : error ? (
        <SomethingWentWrong />
      ) : (
        <IssuesContainerWrapper>
          <InfiniteScroll
            dataLength={issues.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {!!issues &&
              issues.map((issue, index) => (
                <Issue key={issue.id + index} issue={issue} />
              ))}
          </InfiniteScroll>
        </IssuesContainerWrapper>
      )}
    </div>
  );
};

export default IssuesContainer;
