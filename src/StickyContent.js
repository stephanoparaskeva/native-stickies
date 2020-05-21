import * as React from "react";
import { StyleSheet, Animated, UIManager, findNodeHandle } from "react-native";
import { Context } from "./Context";

export default class StickyContent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      y: 0,
      areaBottom: 99999,
      height: 0,
    };
    this.key = `StickyContent-${Math.random()}`;
    this.ready = false;
    this.mounted = false;
    this._onLayout = this._onLayout.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    this.stickyManager.remove(this);
  }

  render() {
    const { children, holdBgColor, enable = true } = this.props;
    const { y, areaBottom, height } = this.state;

    return enable ? (
      <Context.Consumer>
        {(context) => {
          const {
            stickyScrollY,
            stickyManager,
            flatList,
            stickyContainerKey,
          } = context;
          this.stickyScrollY = stickyScrollY;
          this.stickyManager = stickyManager;
          this.flatList = flatList;
          this.stickyContainerKey = stickyContainerKey;
          let styleContent = {},
            styleColor = {};

          if (this.ready) {
            const translateY = this.stickyScrollY.interpolate({
              inputRange: [
                -1,
                0,
                y,
                y + 0.1,
                areaBottom - height - y > 0
                  ? areaBottom - height + 0.1
                  : y + 0.1,
                areaBottom - height - y > 0 ? areaBottom + 0.1 : y + 0.1,
              ],
              outputRange: [
                0,
                0,
                0,
                0.1,
                areaBottom - y - height + 0.1,
                areaBottom - y - height + 0.1,
              ],
            });
            styleContent = { transform: [{ translateY }] };
          }
          return (
            <Animated.View
              onLayout={this._onLayout}
              ref={(e) => (this._me = e)}
              style={[styles.container, styleContent]}
            >
              {children}
            </Animated.View>
          );
        }}
      </Context.Consumer>
    ) : (
      children
    );
  }

  _onLayout(event) {
    if (!this.ready) {
      this.measureLayout();
    } else if (this.stickyManager) {
      this.stickyManager.measureLayoutAll();
    }
  }

  measureLayout(key) {
    const { offsetY } = this.props;
    this.getMeasureTimer && window.clearTimeout(this.getMeasureTimer);
    this.getMeasureTimer = window.setTimeout(() => {
      this.mounted &&
        this._me &&
        this.flatList &&
        UIManager.measureLayout(
          findNodeHandle(this._me),
          findNodeHandle(this.flatList),
          () => {},
          (x, y, w, h) => {
            if (this.mounted && this.stickyManager) {
              this.stickyManager.add(this, y, h, offsetY);
              if (this.stickyContainerKey === key) {
                window.setTimeout(() => {
                  this.mounted &&
                    this.flatList
                      .getNode()
                      .scrollTo({ x: 0, y, animated: true });
                }, 50);
              }
            }
          }
        );
    }, 100);
  }

  update(y, height, areaBottom) {
    this.ready = true;
    this.mounted &&
      this.setState({
        y,
        areaBottom,
        height,
      });
  }
}

const styles = StyleSheet.create({
  container: { zIndex: 9999999 },
});
