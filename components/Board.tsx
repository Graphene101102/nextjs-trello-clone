"use client"

import React from 'react';
import ListContainer from './ListContainer';

type BoardProps = {
  params: {
    boardId: string
  }
};
const Board = async  ({
  params 
}: BoardProps ) => {

  // console.log(params.boardId);

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={params.boardId}  />
    </div>
  );
};

export default Board;