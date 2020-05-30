import React, { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { Context, StickyManager } from './sticky.helper';

type StickyScrollViewProps = {
  children: React.ReactNode;
  onScroll?: (event: any) => void;
};

const StickyScrollView = <Props extends StickyScrollViewProps>({
  children,
  onScroll,
  ...props
}: Props) => {
  const [stickyScrollY] = useState(new Animated.Value(0));
  const scrollView = useRef(null);

  return (
    <Context.Provider
      value={{
        flatList: scrollView,
        stickyScrollY,
        stickyManager: StickyManager(),
      }}>
      <Animated.ScrollView
        {...props}
        ref={scrollView}
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: stickyScrollY } } }],
          { useNativeDriver: true, listener: onScroll }
        )}>
        {children}
      </Animated.ScrollView>
    </Context.Provider>
  );
};

export default StickyScrollView;
