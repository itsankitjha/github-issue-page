import React, { Component } from "react";
import { throttle } from "throttle-debounce";
import { parseThreshold } from "components/commons/threshold";

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoader: false,
      prevDataLength: props.dataLength,
    };

    this.throttledOnScrollListener = throttle(150, this.onScrollListener).bind(
      this
    );
  }

  throttledOnScrollListener;
  el;
  actionTriggered = false;

  componentDidMount() {
    if (typeof this.props.dataLength === "undefined") {
      throw new Error(
        `mandatory prop "dataLength" is missing. The prop is needed` +
          ` when loading more content. Check README.md for usage`
      );
    }

    this.el = window;

    if (this.el) {
      this.el.addEventListener("scroll", this.throttledOnScrollListener);
    }
  }

  componentWillUnmount() {
    if (this.el) {
      this.el.removeEventListener("scroll", this.throttledOnScrollListener);
    }
  }

  componentDidUpdate(prevProps) {
    // do nothing when dataLength is unchanged
    if (this.props.dataLength === prevProps.dataLength) return;

    this.actionTriggered = false;

    // update state when new data was sent in
    this.setState({
      showLoader: false,
    });
  }

  isElementAtBottom(target, scrollThreshold = 0.8) {
    const clientHeight =
      target === document.body || target === document.documentElement
        ? window.screen.availHeight
        : target.clientHeight;

    const threshold = parseThreshold(scrollThreshold);

    return (
      target.scrollTop + clientHeight >=
      (threshold.value / 100) * target.scrollHeight
    );
  }

  onScrollListener = (event) => {
    const target = document.documentElement.scrollTop
      ? document.documentElement
      : document.body;
    // prevents multiple triggers.
    if (this.actionTriggered) return;

    const atBottom = this.isElementAtBottom(target);

    // call the `next` function in the props to trigger the next data fetch
    if (atBottom && this.props.hasMore) {
      this.actionTriggered = true;
      this.setState({ showLoader: true });
      this.props.next && this.props.next();
    }
  };

  render() {
    const hasChildren =
      this.props.hasChildren ||
      !!(
        this.props.children &&
        this.props.children instanceof Array &&
        this.props.children.length
      );

    return (
      <div
        className={`infinite-scroll-component ${this.props.className || ""}`}
      >
        {this.props.children}
        {!this.state.showLoader &&
          !hasChildren &&
          this.props.hasMore &&
          this.props.loader}
        {this.state.showLoader && this.props.hasMore && this.props.loader}
        {!this.props.hasMore && this.props.endMessage}
      </div>
    );
  }
}
