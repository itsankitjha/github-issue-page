import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import LoaderComponent from "../components/commons/LoaderComponent";
import SomethingWentWrong from "../components/commons/SomethingWentWrong";
import { fetchRepoInfo } from "store/slices/repoSlice";

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { fetching, repoInfo, error } = useSelector((state) => state.repo);

  useEffect(() => {
    dispatch(fetchRepoInfo());
  }, []);

  return (
    <div>
      {fetching ? (
        <LoaderComponent />
      ) : error ? (
        <SomethingWentWrong />
      ) : (
        !!repoInfo &&
        Object.keys(repoInfo).length > 0 && <Header {...repoInfo} />
      )}
    </div>
  );
};

export default HeaderContainer;
