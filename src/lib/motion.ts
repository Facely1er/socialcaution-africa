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

const motionCache = new Map<string, ReturnType<typeof createStatic>>();

function getMotionComponent(tag: string) {
  const cached = motionCache.get(tag);
  if (cached) return cached;
  const component = createStatic(tag as keyof React.JSX.IntrinsicElements);
  motionCache.set(tag, component);
  return component;
}

/** Drop-in framer-motion replacement — avoids duplicate React in Vite dev. */
export const motion = new Proxy(
  {
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
    nav: createStatic('nav'),
    header: createStatic('header'),
    footer: createStatic('footer'),
    main: createStatic('main'),
    article: createStatic('article'),
    form: createStatic('form'),
    img: createStatic('img'),
    svg: createStatic('svg'),
  },
  {
    get(target, prop: string) {
      if (prop in target) {
        return target[prop as keyof typeof target];
      }
      if (typeof prop === 'string' && /^[a-z]/.test(prop)) {
        return getMotionComponent(prop);
      }
      return undefined;
    },
  }
) as Record<string, ReturnType<typeof createStatic>>;

export const AnimatePresence: React.FC<{ children?: React.ReactNode; mode?: string; initial?: boolean }> = ({
  children,
}) => React.createElement(React.Fragment, null, children);
