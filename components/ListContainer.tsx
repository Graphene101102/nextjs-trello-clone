import React, { useCallback, useState } from 'react';
import initialData, { Board, Column } from '@/actions/initialData';
import { Container, Draggable, DropResult } from "react-smooth-dnd";
import Columns from './Column';
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap';
import { applyDrag } from '@/utilities/dnd';

// import "@/styles/ListContainer.css";

interface ListContainerProps {
  boardId: string;
}
interface ColumnProps {
  column: Column;
}

const ListContainer: React.FC<ListContainerProps> = ({ boardId }) => {
  const [boardData, setBoardData] = React.useState<Board | null>(null);
  const [columnData, setColumnData] = React.useState<Column[] | []>([]);
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumn = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const onNewColumnTitleChange = useCallback((e: { target: { value: React.SetStateAction<string>; }; }) => setNewColumnTitle(e.target.value), [])


  React.useEffect(() => {
    const fetchBoardData = async () => {
      // console.log(initialData);
      // console.log(boardId);

      const board = initialData.find((board) => board.id === boardId);
      if (board) {
        setBoardData(board);
        setColumnData(board.columns)
      }
    };

    fetchBoardData();
  }, [boardId]);

  if (!boardData) {
    return <div>Loading...</div>;
  }

  const onColumnDrop = (dropResult: any) => {

    let newColumns = [...columnData]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = { ...boardData }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumnData(newColumns)
    setBoardData(newBoard)
    // console.log(newBoard)
  }

  const addNewColumn = () => {
    const newColumnToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: boardData.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: [],
      _destroy:false
    }
    let newColumns = [...columnData]
    newColumns.push(newColumnToAdd)

    let newBoard = { ...boardData }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumnData(newColumns)
    setBoardData(newBoard)

    setNewColumnTitle('')
    toggleOpenNewColumn()
  }

  const onCardDrop = (columnId: string, dropResult: DropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

      let newColumns = [...columnData]
      let currentColumns = newColumns.find(c => c.id === columnId)

      if (currentColumns) {
        currentColumns.cards = applyDrag(currentColumns.cards.slice(), dropResult);
        currentColumns.cardOrder = currentColumns.cards.map(i => i.id)
      } else {
        console.warn("currentColumns is undefined");
      }

      // console.log(newColumns)
      setColumnData(newColumns)

    }
  }

  const onUpdateColumn = (newColumnToUpdate: Column) => {
    const columnIdToUpdate = newColumnToUpdate.id
    let newColumns = [...columnData]
    const columnToUpdate = newColumns.findIndex(i => i.id === columnIdToUpdate)

    if (newColumnToUpdate._destroy) {
      //remove column
      newColumns.splice(columnToUpdate, 1)
    } else {
      //change title
      newColumns.splice(columnToUpdate, 1, newColumnToUpdate)
    }

    let newBoard = { ...boardData }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumnData(newColumns)
    setBoardData(newBoard)
  }


  return (
    <div className="card-scene">
      <div className="card-scene">
        <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "cards-drop-preview",
          }}
          render={() => (
            <>
              {columnData.map((column) => (
                <Draggable key={column.id}
                  render={() => <>{
                    <Columns column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn} />
                  }</>}
                />
              ))}
            </>
          )}
        />
        <BootstrapContainer className="container">
          {!openNewColumnForm && <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumn}>
              <i className="fa fa-plus icon" /> Add another column
            </Col>
          </Row>}

          {openNewColumnForm && <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter column title..."
                className="input-new-column"
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>Add column</Button>{' '}
              <span className="cancel-icon" onClick={toggleOpenNewColumn}> <i className="fa fa-trash icon" /></span>
            </Col>
          </Row>}

        </BootstrapContainer>
      </div>
    </div>

  );
};

export default ListContainer;