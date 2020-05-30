import React from 'react';
import { View } from 'react-native';
import { Context } from './sticky.helper';

type StickyContainerProps = {
  children: React.ReactNode;
  externalStickyManager: () => void;
  external?: boolean;
  style?: boolean;
};

const StickyContainer = ({
  children,
  externalStickyManager,
  ...props
}: StickyContainerProps) => {
  return (
    <Context.Consumer>
      {context => {
        const { stickyScrollY, flatList, stickyManager } = context;

        return (
          <Context.Provider
            value={{
              flatList,
              stickyScrollY,
              stickyManager: externalStickyManager || stickyManager,
            }}>
            <View {...props} style={{ zIndex: 10 }}>
              {children}
            </View>
          </Context.Provider>
        );
      }}
    </Context.Consumer>
  );
};

export default StickyContainer;
