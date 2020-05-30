import { Dispatch, SetStateAction, Component } from 'react';
import { Animated } from 'react-native';

export type ContextType = {
  stickyManager: null | AddStickyType;
  stickyScrollY: null | Animated.Value;
  flatList: null | { current: Component<any, any, any> | null };
};

export type Dimensions = { y: number; h: number; nextY?: number };

export type AddStickyProps = {
  y?: number;
  h?: number;
  setDimensions?: Dispatch<
    SetStateAction<{ y: number; h: number; nextY: number }>
  >;
  offsetY?: number;
  offsetH?: number;
  cancel?: boolean;
};

export type AddStickyType = ({
  y,
  h,
  setDimensions,
  offsetY,
  offsetH,
}: AddStickyProps) => void;

export type StickyManagerType = () => AddStickyType;
