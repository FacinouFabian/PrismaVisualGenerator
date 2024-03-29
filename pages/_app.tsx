import React from "react";

import "@/layouts/styles/tailwind.css";
import "@/layouts/styles/index.css";
import Pair, { PairProvider } from "@/core/contexts/pairContext";
import Table, { TableProvider } from "@/core/contexts/tableContext";

type Props = {
  // the active page
  Component: any;
  // object with the initial props that were preloaded for your page
  pageProps: unknown;
};

/**
 * @pages MyApp
 * @description component to initialize pages
 *
 * @param {Props}
 * @return the active page overriding with props
 *
 */
const MyApp = ({ Component, pageProps }: Props): JSX.Element => {
  return (
    <TableProvider {...Table}>
      <PairProvider {...Pair}>
        <React.StrictMode>
          <Component {...pageProps} />
        </React.StrictMode>
      </PairProvider>
    </TableProvider>
  );
};

export default MyApp;
