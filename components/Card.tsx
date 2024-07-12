import React from 'react';
import { Card as CardType } from '@/actions/initialData';

type CardProps = {
  card: CardType;
};

const Card: React.FC<CardProps> = ({ card }) => {

  return (
    <div className="bg-yellow-50 p-2 rounded-md mb-2">
      {card.cover &&
        <img
          src={card.cover}
          className="block rounded-t-md"
          alt="Viet-alt-img"
          onMouseDown={e => e.preventDefault()}
        />}
      {card.title}
    </div>
  );
};

export default Card;