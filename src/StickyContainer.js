import React, { Component } from "react";
import { View } from "react-native";
import { Zindex, Context } from "./Context";

export default class StickyContainer extends Component {
  constructor(props) {
    super(props);
    this.zIndex = Zindex.number--;
    this.firstLoad = true;
    this.key = `StickyContainer-${Math.random()}`;
    this.height = 0;
    this._onLayout = this._onLayout.bind(this);
  }

  render() {
    const { children, external } = this.props;
    return (
      <Context.Consumer>
        {(context) => {
          const { stickyScrollY, stickyManager, scrollView } = context;
          this.stickyManager = stickyManager;
          return (
            <Context.Provider
              value={{
                stickyScrollY,
                stickyManager: external ? new StickyManager() : stickyManager,
                scrollView,
                stickyContainerKey: this.key,
              }}
            >
              <View onLayout={this._onLayout} style={{ zIndex: this.zIndex }}>
                {children}
              </View>
            </Context.Provider>
          );
        }}
      </Context.Consumer>
    );
  }

  _onLayout(event) {
    if (
      !this.firstLoad &&
      Math.abs(this.height - event.nativeEvent.layout.height) > 5
    ) {
      this.stickyManager.measureLayoutAll(this.key);
    }
    this.height = event.nativeEvent.layout.height;
    this.firstLoad = false;
  }
}
