import { useEffect, useRef } from 'react';

import { useIsomorphicEffect } from './hooks';

export default function useGetSnapshotBeforeUpdate(cb, props, state) {
  const { prevProps, prevState } = usePrevPropsAndState(props, state);
  const snapshot = useRef(undefined);

  const componentJustMounted = useRef(true);
  const isomorphicEffect = useIsomorphicEffect();
  isomorphicEffect(() => {
    if (!componentJustMounted.current) {
      snapshot.current = cb(prevProps, prevState);
    }
    componentJustMounted.current = false;
  });

  const useComponentDidUpdate = (callback) => {
    useEffect(() => {
      if (!componentJustMounted.current)
        callback(prevProps, prevState, snapshot.current);
    });
  };

  return useComponentDidUpdate;
}

function usePrevPropsAndState(props, state) {
  const prevPropsAndStateRef = useRef({ props: undefined, state: undefined });
  const prevProps = prevPropsAndStateRef.current.props;
  const prevState = prevPropsAndStateRef.current.state;

  useEffect(() => {
    prevPropsAndStateRef.current = { props, state };
  });

  return { prevProps, prevState };
}
