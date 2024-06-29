export type Card = {
    id: string;
    boardId: string;
    columnId: string;
    title: string;
    cover: string;
  };
  
  export type Column = {
    id: string;
    boardId: string;
    title: string;
    cardOrder: string[];
    cards: Card[];
    _destroy: boolean;
  };
 
  export type Board = {
    id: string;
    title:string;
    cover: string;
    columnOrder: string[];
    columns: Column[];
  };
  
  const initialData: Board[] = [
    {
      id: 'board1',
      title: 'Board 1',
      cover: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwNaUFAOOoHB_rUD3JqZgwCRc6iqHqNo7UmfcSZclZGeFTVbJF',
      columnOrder: ['column-1', 'column-2'],
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'To Do',
          cardOrder: ['card-1', 'card-2'],
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Task 1',
              cover: '',
            },
            {
              id: 'card-2',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Task 2',
              cover: '',
            },
          ],
          _destroy:false
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'In Progress',
          cardOrder: ['card-3', 'card-4'],
          cards: [
            {
              id: 'card-3',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Task 3',
              cover: '',
            },
            {
              id: 'card-4',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Task 4',
              cover: '',
            },
          ],
          _destroy:false
        },
      ],
    },
    {
        id: 'board2',
        title: 'Board 2',
        cover: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwNaUFAOOoHB_rUD3JqZgwCRc6iqHqNo7UmfcSZclZGeFTVbJF',
        columnOrder: ['column-1', 'column-2'],
        columns: [
          {
            id: 'column-1',
            boardId: 'board-1',
            title: 'To Do',
            cardOrder: ['card-1', 'card-2'],
            cards: [
              {
                id: 'card-1',
                boardId: 'board-1',
                columnId: 'column-1',
                title: 'Task 1',
                cover: '',
              },
              {
                id: 'card-2',
                boardId: 'board-1',
                columnId: 'column-1',
                title: 'Task 2',
                cover: '',
              },
            ],
            _destroy:false
          },
          {
            id: 'column-2',
            boardId: 'board-1',
            title: 'In Progress',
            cardOrder: ['card-3', 'card-4'],
            cards: [
              {
                id: 'card-3',
                boardId: 'board-1',
                columnId: 'column-2',
                title: 'Task 3',
                cover: '',
              },
              {
                id: 'card-4',
                boardId: 'board-1',
                columnId: 'column-2',
                title: 'Task 4',
                cover: '',
              },
            ],
            _destroy:false
          },
        ],
      },
  ];

  export default initialData;