import React from 'react';
import { Column as ColumnType, Card as CardType } from '@/actions/initialData';
import Card from '@/components/Card';
import { Dropdown, Form } from 'react-bootstrap';
import { Container, Draggable } from "react-smooth-dnd";
import ConfirmModal from './confirmModal';


type ColumnProps = {
  column: ColumnType;
  cards: CardType[];
};

const Column = ({ column, cards }: ColumnProps) => {
  return (
    <div className="column">
            <header className="column-drag-handle">
                <div className="column-title">
                    {/* <Form.Control
                        size="sm"
                        type="text"
                        className="trello-content-editable"
                        value={columnTitle}
                        onChange={columnTitleChange}
                        onBlur={columnTitleChangeBlur}
                        onKeyDown={PressEnter}
                    // onMouseDown={e => e.preventDefault()}
                    /> */}
                </div>
                <div className="column-dropdown-actions">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Add card...</Dropdown.Item>
                            {/* <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column...</Dropdown.Item> */}
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

            </header>
            <div className="task-list">
                {/* <Container
                    groupName="col"
                    // onDragStart={e => console.log("drag started", e)}
                    // onDragEnd={e => console.log("drag end", e)}
                    // onDrop={dropResult => onCardDrop(column.id, dropResult)}
                    // getChildPayload={index => cards[index]}
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
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Card card={card} />
                        </Draggable>

                    ))}
                </Container> */}
                {/* {openNewCardForm &&
                    <div className="add-new-card-area">
                        <Form.Control
                            size="sm"
                            as="textarea"
                            row='3'
                            placeholder="Enter a little for this card..."
                            className="input-new-card"
                            value={newCardContent}
                            onChange={onNewCard}
                        // onKeyDown={event => (event.key === 'Enter') && addNewCard()}
                        />
                        <Button variant="success" size="sm" onClick={addNewCard}>Add Card</Button>{' '}
                        <span className="cancel-icon" onClick={toggleOpenNewCard}> <i className="fa fa-trash icon" /></span>
                    </div>
                } */}

            </div>

            {/* <footer>
                {!openNewCardForm &&
                    <div className="footer-action" onClick={toggleOpenNewCard}>
                        <i className="fa fa-plus icon" /> Add another card
                    </div>
                }
            </footer> */}




            {/* <ConfirmModal
                title="Remove column"
                content={'Are you sure you want to remove this column!'}
                show={show}
                onAction={onConfirmModalAction}
            /> */}


        </div>
  );
};

export default Column;