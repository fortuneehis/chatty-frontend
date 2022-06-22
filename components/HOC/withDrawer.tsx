/* eslint-disable react/display-name */
import { AnimatePresence } from "framer-motion";
import { ComponentType, useEffect, useState } from "react";
import { MediaQueryAllQueryable, useMediaQuery } from "react-responsive";

const withDrawer =
  <T extends { showDrawer: boolean }>(Component: ComponentType<T>) =>
  (matches: MediaQueryAllQueryable) =>
  (props: Omit<T, "match">): JSX.Element => {
    const handleMediaQueryChange = (matches: boolean) => {
      console.log("it changed", matches);
      setMediaQueryMatch(matches);
    };

    const match = useMediaQuery(matches, undefined, handleMediaQueryChange);

    const [mediaQueryMatch, setMediaQueryMatch] = useState(match);

    return (
      <>
        {mediaQueryMatch ? (
          <AnimatePresence>
            {props.showDrawer && (
              <Component {...(props as T)} match={mediaQueryMatch} />
            )}
          </AnimatePresence>
        ) : (
          <Component {...(props as T)} match={match} />
        )}
      </>
    );
  };

export default withDrawer;
