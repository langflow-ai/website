export const positionHelpers = {
  getRightCenter: (rect: DOMRect) => ({
    x: rect.right,
    y: rect.top + rect.height / 2,
  }),
  getTopRight: (rect: DOMRect, offset: number = 0) => ({
    x: rect.right - offset,
    y: rect.top,
  }),
  getTopLeft: (rect: DOMRect, offset: number = 0) => ({
    x: rect.left + offset,
    y: rect.top,
  }),
  getTopCenter: (rect: DOMRect) => ({
    x: rect.left + rect.width / 2  ,
    y: rect.top,
  }),
  getLeftCenter: (rect: DOMRect, offset: number = 0) => ({
    x: rect.left,
    y: rect.top + rect.height / 2 + offset,
  }),
  getRightBottom: (rect: DOMRect, offset: number = 0) => ({
    x: rect.right - offset,
    y: rect.bottom - 60,
  }),
  getBottomRight: (rect: DOMRect, offset: number = 0) => ({
    x: rect.right - offset,  
    y: rect.bottom - 65
  }),

  getLeftBottom: (rect: DOMRect, offset: number = 0) => ({
    x: rect.left + offset,  
    y: rect.bottom
  }),

  getLeftTop: (rect: DOMRect, offset: number = 0) => ({
    x: rect.left + offset,  
    y: rect.top
  }),
};
