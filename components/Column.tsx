import React, { useEffect, useState } from 'react';
import { Column } from '@/actions/initialData';
import Card from './Card';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import ConfirmModal from './confirmModal';
import { cloneDeep } from "lodash";


interface ColumnProps {
  column: Column;
  onCardDrop: (columnId: string, dropResult: DropResult) => void;
  onUpdateColumn: (newColumnToUpdate: Column) => void;
}

const Columns: React.FC<ColumnProps> = ({ column, onCardDrop, onUpdateColumn }) => {

  const card = column.cards

  const [show, setShow] = useState(false);
  const toggleShowConfirmModal = () => setShow(!show)

  const [columnTitle, setColumnTitle] = useState('')
  const columnTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setColumnTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toggleOpenNewCard = () => setOpenNewCardForm(!openNewCardForm)

  const [newCardContent, setNewCardContent] = useState('')
  const onNewCard = (e: { target: { value: React.SetStateAction<string>; }; }) => setNewCardContent(e.target.value)

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

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

  const columnTitleChangeBlur = () => {
    console.log(columnTitle)
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
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

  const PressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLInputElement).blur();
    }
  }

  return (
    <div className="column">
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
      <div className="task-list">
        <Container
          groupName="col"
          // onDragStart={e => console.log("drag started", e)}
          // onDragEnd={e => console.log("drag end", e)}
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={index => card[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          // onDragEnter={() => {
          //   console.log("drag enter:", column.id);
          // }}
          // onDragLeave={() => {
          //   console.log("drag leave:", column.id);
          // }}
          // onDropReady={p => console.log('Drop ready: ', p)}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          // dropPlaceholderAnimationDuration={200}

          render={() => (
            <>
              {card.map((card, index) => (
                <Draggable key={index}
                  render={() => (
                    <>
                      <Card card={card} />
                    </>
                  )}
                />
              ))}
            </>
          )}
        />

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

      </div>

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