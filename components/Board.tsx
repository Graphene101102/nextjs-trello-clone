"use client"

import React from 'react';
import initialData, { Board as BoardType } from '@/actions/initialData';
import Column from '@/components/Column';
import { Columns } from 'lucide-react';
import ListContainer from './ListContainer';

type BoardProps = {
  params: {
    boardId: string
  }
};
const Board = async  ({
  params 
}: BoardProps ) => {

  // const Board = await initialData.find(Board => Board.id == params.boardId)
  // console.log(params.boardId);

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={params.boardId}  />
    </div>
  );
};

export default Board;