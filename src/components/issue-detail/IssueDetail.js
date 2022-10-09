/* eslint-disable no-nested-ternary */
import React, { Component, useEffect, useState } from "react";
// import { fetchIssueDetail } from "../../api/fetchIssueDetail";
import { GIT_ISSUE_ENDPOINT, OWNER, REPO, WEB_URL } from "config/constants";
import styled from "styled-components";
import IssueOpenedSVG from "../commons/svg/IssueOpenedSVG";
import { getDifference } from "../commons/getTimeDifference";
import { UserAnchor } from "../issues-table/Issue";
import IssueDetailHeader from "./IssueDetailHeader";
import IssueNumber from "./IssueNumber";
import StateButton from "./StateButton";
import WhoOpenedIssueAndWhen from "./WhoOpenedTheIssueAndWhen";
import LoaderComponent from "../commons/LoaderComponent";
import SomethingWentWrong from "../commons/SomethingWentWrong";
import requestApi from "config/apiHandler";
import { useParams } from "react-router-dom";

const IssueInformation = styled.div`
  margin: 10px 0px;
`;

const IssueDetailContainer = styled.div``;

const IssueDetail = () => {
  const [issue, setIssue] = useState({});
  const [error, setError] = useState("");

  const { id } = useParams();
  useEffect(() => {
    requestApi(`${GIT_ISSUE_ENDPOINT}/${id}`, "GET").then(
      (response) => {
        setIssue(response);
      },
      (error) => {
        setError(error);
      }
    );
  }, []);

  return (
    <div>
      {Object.keys(issue).length > 0 ? (
        <IssueDetailContainer>
          <IssueDetailHeader>
            <span>{issue.title}</span>
            <IssueNumber>#{issue.number}</IssueNumber>
          </IssueDetailHeader>

          <IssueInformation>
            <StateButton>
              <IssueOpenedSVG />
              {issue.state}
            </StateButton>
            <WhoOpenedIssueAndWhen>
              <UserAnchor
                style={{ fontWeight: "bold" }}
                href={`${WEB_URL}/${OWNER}/${REPO}/issues/created_by/${issue.user.login}`}
              >
                {issue.user.login}{" "}
              </UserAnchor>
              opened this issue {getDifference(issue.created_at)} ago ·{" "}
              {issue.comments} comments
            </WhoOpenedIssueAndWhen>
          </IssueInformation>
        </IssueDetailContainer>
      ) : (
        <LoaderComponent />
      )}
      {!!error && <SomethingWentWrong />}
    </div>
  );
};

export default IssueDetail;
