import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit } from "@taquito/taquito";
import objktList from "../service/objktList";

const ItemList = ({
  Tezos,
  userAddress
}: {
  Tezos: TezosToolkit;
  userAddress: string;
}): JSX.Element => {
  const result = objktList(userAddress);

  return (
    <div id="item-list">
      <h2>items in wallet {userAddress}</h2>
      
      {result.status === 'loading' && <div>Loading...</div>}
      {result.status === 'loaded' &&
        result.payload.results.map(objkt => (
          <div>{objkt.title}</div>
        ))}
      {result.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}

    </div>
  );
};

export default ItemList;
