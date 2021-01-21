import { useLayoutEffect, useRef, useEffect, useCallback } from 'react';

const isBrowser = typeof window !== `undefined`;

function isDisplayed({ elements, offset }) {
  if (!isBrowser) return [];

  const visibleElementsArr = [];

  console.log('elements = ',elements);
  //console.log('offset = ',offset)
  if(elements[0] && elements[0].ref && elements[0].ref.current !== null) {
    let flag = 0;
    for(let i=0;i<elements.length;i++) {
            const position = elements[i].ref.current.getBoundingClientRect();
            if((position.top + offset) >= 0 && (position.top - offset) <= window.innerHeight) {
                visibleElementsArr.push({obj: elements[i], num: i+1});
                if(flag === 0)
                    flag = 1;
            } else {
                if(flag === 1)
                    break;
            }
    }
  }
  
  return visibleElementsArr;
};

export function useDisplayedElements(effect, deps, elements, wait, offset, loaded) {
  const throttleTimeout = useRef(null);

  const callBack = useCallback( () => {
    const currDisplay = isDisplayed({ elements, offset });
    effect({ currDisplay });
    throttleTimeout.current = null;
  },[effect, elements, offset]);

  const handleRenderedElements = useCallback( () => {
    if (wait) {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = window.setTimeout(callBack, wait);
      }
    } else {
      callBack();
    };
  },[wait, callBack]);

  deps.push(handleRenderedElements)
  let d = deps;
  d.push(loaded);
  d.push(elements);

  useLayoutEffect(() => {

    window.addEventListener('scroll', handleRenderedElements, false);
    window.addEventListener('resize', handleRenderedElements);

    return () => { 
        window.removeEventListener('scroll', handleRenderedElements);
        window.removeEventListener('resize',handleRenderedElements);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
      if(loaded && elements[0]) {
        handleRenderedElements();
        //console.log('pageLoaded!');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },d);

};