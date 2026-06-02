import React from 'react';

const MOTION_PROPS = new Set([
  'initial',
  'animate',
  'whileInView',
  'whileHover',
  'whileTap',
  'whileFocus',
  'whileDrag',
  'transition',
  'viewport',
  'variants',
  'exit',
  'layout',
  'layoutId',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
]);

function stripMotionProps<P extends Record<string, unknown>>(props: P) {
  const rest = { ...props };
  for (const key of MOTION_PROPS) {
    delete rest[key];
  }
  return rest as Omit<P, keyof typeof MOTION_PROPS>;
}

function createStatic(tag: keyof React.JSX.IntrinsicElements) {
  return React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(
    function StaticMotion(props, ref) {
      return React.createElement(tag, { ...stripMotionProps(props), ref });
    }
  );
}

/** Drop-in motion replacement — renders immediately with no enter/scroll delays. */
export const motion = {
  div: createStatic('div'),
  h1: createStatic('h1'),
  h2: createStatic('h2'),
  h3: createStatic('h3'),
  p: createStatic('p'),
  span: createStatic('span'),
  section: createStatic('section'),
  ul: createStatic('ul'),
  li: createStatic('li'),
  button: createStatic('button'),
  a: createStatic('a'),
};

export const AnimatePresence: React.FC<{ children?: React.ReactNode; mode?: string; initial?: boolean }> = ({
  children,
}) => React.createElement(React.Fragment, null, children);
