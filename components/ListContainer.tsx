// "use client"

import React, { useCallback, useState } from 'react';
import initialData, { Board, Column } from '@/actions/initialData';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "@/styles/ListContainer.css";
import Columns from './Column';
import { isEmpty } from "lodash";

interface ListContainerProps {
  boardId: string;
}

const ListContainer: React.FC<ListContainerProps> = ({ boardId }) => {
  const [boardData, setBoardData] = React.useState<Board | null>(null);
  const [columnData, setColumnData] = React.useState<Column[] | []>([]);

  /*GET DATA*/
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

  // if (isEmpty(boardData)) {
  //   return <div className="not-found" style={{ 'padding': '10px', 'color': 'white' }}>Board not found</div>
  // }

  //Show new column form
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumn = () => setOpenNewColumnForm(!openNewColumnForm)

  //Change column title
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = useCallback((e: { target: { value: React.SetStateAction<string>; }; }) => setNewColumnTitle(e.target.value), [])

  const addNewColumn = () => {
    if (!isEmpty(boardData)) {
      const newColumnToAdd = {
        id: Math.random().toString(36).substring(2, 5),
        boardId: boardData.id,
        title: newColumnTitle.trim(),
        cardOrder: [],
        cards: [],
        _destroy: false
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
  }

  const onUpdateColumn = (newColumnToUpdate: Column) => {
    if (!isEmpty(boardData)) {
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
  }
  return (
    <div className='board_content'>

      {columnData.map((column, index) => <Columns key={index} column={column} onUpdateColumn={onUpdateColumn} />)}

      <Container className="container">
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

      </Container>
    </div>
  );
};

export default ListContainer;