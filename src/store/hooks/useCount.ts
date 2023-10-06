import {
  addBarang,
  decrement,
  increment,
  incrementTwo,
} from "../reducers/countSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const useCount = () => {
  const dispatch = useAppDispatch();
  const { count, barang } = useAppSelector((state) => state.counter);
  const setIncrement = () => {
    dispatch(increment());
  };
  const setDecrement = () => {
    dispatch(decrement());
  };
  const setIncrementTwo = () => {
    dispatch(incrementTwo(count + 2));
  };
  const setAddBarang = () => {
    dispatch(addBarang(barang + 1));
  };

  return {
    isCount: count,
    isBarang: barang,
    setIncrement,
    setIncrementTwo,
    setDecrement,
    setAddBarang,
  };
};
