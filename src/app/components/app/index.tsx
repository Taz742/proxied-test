import { Products } from '../products';
import { Cart } from '../cart';

export const App = () => {
  return (
    <div className="flex flex-col">
      <Cart />
      <Products />
    </div>
  );
};
