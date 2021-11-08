import { useState, useEffect } from "react";
import DropdownMenu from '../components/DropdownMenu.js';
import ShopperSettings from '../components/ShopperSettings.js';
import styles from '../styles/Index.module.css';

const Index = () => {
  const [numShoppers, setNumShoppers] = useState(0);
  const [shoppers, setShoppers] = useState([]);

  const Shopper = {
    name: '',
    isVegetarian: false,
    exception: 0,
  }

  useEffect(() => {
    setShoppers(Array.from({length: numShoppers}, (_, i) => Object.create(Shopper)));
  }, [numShoppers]);


  return (
    <div className={styles.container}>
      <DropdownMenu setNumShoppers={setNumShoppers}/>
      {shoppers.length && <ShopperSettings shoppers={shoppers} setShoppers={setShoppers}/>}
      <div>
        {shoppers.map((shopper, id) => (
          <div key={id}>
            {shopper.name}, {shopper.isVegetarian}, {shopper.exception}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index;
