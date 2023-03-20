import React from 'react';
import { useGamesContext } from '@/hooks/useGamesContext';
import Order from '@/components/ui/Order';

const Ordering = () => {
  const setOrder = useGamesContext((state) => state.setOrder);
  const refetchGames = useGamesContext((state) => state.refetchGames);

  const handleOrderChange = (order) => {
    setOrder(order);
    refetchGames();
  };

  return (
    <>
      <Order
        title="Release date"
        desc="-released"
        asc="released"
        onChange={(value) => handleOrderChange({ parameter: 'release', value })}
      />
      <Order
        title="Rating"
        desc="-rating"
        asc="rating"
        onChange={(value) => handleOrderChange({ parameter: 'rating', value })}
      />
    </>
  );
};

export default Ordering;
