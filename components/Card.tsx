import React from 'react';
import { Card as CardType } from '@/actions/initialData';

type CardProps = {
  card: CardType;
};

const Card: React.FC<CardProps> = ({ card }) => {

  return (
    <div className="card-item">
      {card.cover &&
        <img
          src={card.cover}
          className="card-cover"
          alt="Viet-alt-img"
          onMouseDown={e => e.preventDefault()}
        />}
      {card.title}
    </div>
  );
};

export default Card;