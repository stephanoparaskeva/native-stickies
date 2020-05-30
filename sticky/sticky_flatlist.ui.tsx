import React, { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { Context } from './sticky.helper';

type StickyFlatListProps = {
  children: any;
  onScroll?: (event: any) => void;
  stickyManager: () => void;
};

const StickyFlatList = <Props extends StickyFlatListProps>({
  children,
  onScroll,
  stickyManager,
  ...props
}: Props) => {
  const [stickyScrollY] = useState(new Animated.Value(0));
  const flatList = useRef(null);

  return (
    <Context.Provider
      value={{
        flatList,
        stickyScrollY,
        stickyManager,
      }}>
      <Animated.FlatList
        {...props}
        ref={flatList}
        data={[]}
        renderItem={() => {}}
        style={{ flex: 1 }}
        ListHeaderComponent={children}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: stickyScrollY } } }],
          { useNativeDriver: true, listener: onScroll }
        )}
      />
    </Context.Provider>
  );
};

export default StickyFlatList;
