import React from 'react';
import {
  ContextType,
  StickyManagerType,
  Dimensions,
  AddStickyProps,
} from './sticky.type';

export const Context = React.createContext<ContextType>({
  stickyManager: null,
  stickyScrollY: null,
  flatList: null,
});

export const StickyManager: StickyManagerType = () => {
  let stickysClosure = [{ y: 100 ** 100, h: 0 }] as any;

  return ({
    y: measuredY,
    h: measuredH,
    setDimensions,
    offsetY,
    offsetH,
    cancel,
  }) => {
    if (cancel) {
      stickysClosure = stickysClosure.map((s: AddStickyProps) => {
        if (s && s.setDimensions) {
          s.setDimensions = undefined;
        }
        return s;
      });
      return;
    }
    stickysClosure = [
      ...stickysClosure,
      { setDimensions, y: measuredY, h: measuredH },
    ];
    const stickys = stickysClosure.sort(
      (a: Dimensions, b: Dimensions) => a.y - b.y
    );

    for (let i = 0; i < stickys.length - 1; i++) {
      const { y, h, setDimensions: update } = stickys[i];

      const nextY = stickys[i + 1].y;
      const newY = offsetY ? y + offsetY : y;
      const newH = offsetH ? h + offsetH : h;

      update && update({ y: newY, h: newH, nextY });
    }
  };
};
