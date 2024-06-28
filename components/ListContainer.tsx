import React from 'react';
import initialData, { Board, Column } from '@/actions/initialData';
// import "@/styles/ListContainer.css";

interface ListContainerProps {
  boardId: string;
}

const ListContainer: React.FC<ListContainerProps> = ({ boardId }) => {
  const [boardData, setBoardData] = React.useState<Board | null>(null);

  React.useEffect(() => {
    const fetchBoardData = async () => {
      // console.log(initialData);
      // console.log(boardId);

      const board = initialData.find((board) => board.id === boardId);
      if (board) {
        setBoardData(board);
      }
    };

    fetchBoardData();
  }, [boardId]);

  if (!boardData) {
    return <div>Loading...</div>;
  }

  const { title, columns } = boardData;

  return (
    <div className="container">
      <div className="columns">
        {columns.map((column) => (
          <ul>
            <li key={column.id} className="column">
              <h3 className="column-title">{column.title}</h3>
              <ul className="card-list"> {/* Nesting list for cards */}
                {column.cards.map((card) => (
                  <li key={card.id} className="card">
                    {card.title}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ListContainer;