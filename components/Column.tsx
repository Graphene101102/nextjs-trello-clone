import React, { useEffect, useState } from 'react';
import { Column } from '@/actions/initialData';
import Card from './Card';
import { Button, Dropdown, Form } from 'react-bootstrap';
import ConfirmModal from './confirmModal';
import { cloneDeep } from 'lodash';
import "@/styles/column.scss";

interface ColumnProps {
  column: Column;
  onUpdateColumn: (column: Column) => void;
}

const Columns: React.FC<ColumnProps> = ({ column, onUpdateColumn }) => {

  const [columnData, setColumnData] = React.useState<Column | null>(column || null);

  //Change column title
  const [columnTitle, setColumnTitle] = useState('')
  const columnTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setColumnTitle(e.target.value)
  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  const [show, setShow] = useState(false);
  const toggleShowConfirmModal = () => setShow(!show)

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toggleOpenNewCard = () => setOpenNewCardForm(!openNewCardForm)

  const [newCardContent, setNewCardContent] = useState('')
  const onNewCard = (e: { target: { value: React.SetStateAction<string>; }; }) => setNewCardContent(e.target.value)



  const columnTitleChangeBlur = () => {
    console.log(columnTitle)
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  const onConfirmModalAction = (type: any) => {
    console.log(type)
    if (type === 'MODAL_ACTION_CONFIRM') {
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModal()
  }

  const PressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLInputElement).blur();
    }
  }

  const addNewCard = () => {
    const newCardToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: column.boardId,
      columnId: column.id,
      title: newCardContent.trim(),
      cover: '',
    }
    // console.log(newCardToAdd)

    let newColumn = cloneDeep(column)
    newColumn.cards.push(newCardToAdd)
    newColumn.cardOrder.push(newCardToAdd.id)

    onUpdateColumn(newColumn)
    setNewCardContent('')
    toggleOpenNewCard()
  }


  return (
    <div className='Column'>
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="trello-content-editable"
            value={columnTitle}
            onChange={columnTitleChange}
            onBlur={columnTitleChangeBlur}
            onKeyDown={PressEnter}
          // onMouseDown={e => e.preventDefault()}
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column...</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

      </header>
      <ul className='card-list'>
        {columnData?.cards.map((card, index) => <Card key={index} card={card} />)}
        {openNewCardForm &&
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              rows={3}
              placeholder="Enter a little for this card..."
              className="input-new-card"
              value={newCardContent}
              onChange={onNewCard}
            // onKeyDown={event => (event.key === 'Enter') && addNewCard()}
            />
            <Button variant="success" size="sm" onClick={addNewCard}>Add Card</Button>{' '}
            <span className="cancel-icon" onClick={toggleOpenNewCard}> <i className="fa fa-trash icon" /></span>
          </div>
        }
      </ul>

      <footer>
        {!openNewCardForm &&
          <div className="footer-action" onClick={toggleOpenNewCard}>
            <i className="fa fa-plus icon" /> Add another card
          </div>
        }
      </footer>

      <ConfirmModal
        title="Remove column"
        content={'Are you sure you want to remove this column!'}
        show={show}
        onAction={onConfirmModalAction}
      />
    </div>
  );
};

export default Columns;