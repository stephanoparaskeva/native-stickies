import React, {
  useState,
  useRef,
  Component,
  useEffect,
  useContext,
} from 'react';
import { Animated, UIManager, findNodeHandle } from 'react-native';
import { Context } from './sticky.helper';
import { AddStickyType } from './sticky.type';

type StickyContentProps = {
  children: React.ReactNode;
  offsetY?: number;
  offsetH?: number;
};

const StickyContent = ({
  offsetY,
  offsetH,
  children,
  ...props
}: StickyContentProps) => {
  const [dimensions, setDimensions] = useState({ y: 0, h: 0, nextY: 0 });
  const ctx = useContext(Context);
  const stickyContent = useRef(null);

  useEffect(() => {
    return () => ctx.stickyManager?.({ cancel: true });
  }, []);

  const stickyHandler = (stickyManager: AddStickyType) => (
    _: number,
    y: number,
    _1: number,
    h: number
  ) => stickyManager({ y, h, setDimensions, offsetY, offsetH });

  const measureLayout = (
    stickyManager: AddStickyType,
    flatList: { current: Component<any, any, any> | null } | null
  ) => {
    UIManager.measureLayout(
      findNodeHandle(stickyContent.current) as number,
      findNodeHandle(flatList?.current ?? null) as number,
      () => {},
      stickyHandler(stickyManager)
    );
  };

  return (
    <Context.Consumer>
      {context => {
        const { stickyManager, stickyScrollY, flatList } = context;

        const { y, h, nextY } = dimensions;

        const spaceBetween = nextY - y - h;

        const lastInput = spaceBetween > 0 ? nextY + 0.1 : y + 0.1;
        const secondLastInput = spaceBetween > 0 ? nextY - h + 0.1 : y + 0.1;

        const translateY = stickyScrollY?.interpolate({
          inputRange: [-1, 0, y, y + 0.1, secondLastInput, lastInput],
          outputRange: [0, 0, 0, 0.1, spaceBetween + 0.1, spaceBetween + 0.1],
        });

        return (
          <Animated.View
            {...props}
            onLayout={() =>
              measureLayout(stickyManager as AddStickyType, flatList)
            }
            ref={stickyContent}
            style={[{ zIndex: 5 }, { transform: [{ translateY }] }]}>
            {children}
          </Animated.View>
        );
      }}
    </Context.Consumer>
  );
};

export default StickyContent;
