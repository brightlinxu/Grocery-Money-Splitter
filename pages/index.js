import { useState, useEffect } from "react";
import DropdownMenu from '../components/DropdownMenu.js';
import ShopperSettings from '../components/ShopperSettings.js';
import styles from '../styles/Index.module.css';

const Index = () => {
  const [numShoppers, setNumShoppers] = useState(0);
  const [shoppers, setShoppers] = useState([]);

  // new shopper
  const Shopper = {
    name: '',
    isVegetarian: false,
    exception: 0,
  }

  const handleCalculation = () => {
    console.log('handleCalculation');
    
  }

  useEffect(() => {
    if (shoppers.length === 0) {
      // create new shopper list
      setShoppers(Array.from({length: numShoppers}, (_, i) => Object.create(Shopper)));
    }
    else if (numShoppers > shoppers.length) {
      // add on new empty shoppers
      const newBlankShoppers = Array.from({length: numShoppers - shoppers.length}, (_, i) => Object.create(Shopper))
      const newShoppers = [...shoppers];
      newShoppers.push(...newBlankShoppers);
      setShoppers(newShoppers);
    }
    else if (numShoppers < shoppers.length) {
      // remove some shoppers
      const newShoppers = [...shoppers];
      newShoppers = newShoppers.slice(0, numShoppers);
      setShoppers(newShoppers);
    }

  }, [numShoppers]);


  return (
    <div className={styles.container}>
      <DropdownMenu setNumShoppers={setNumShoppers}/>
      {shoppers.length !== 0 && <ShopperSettings shoppers={shoppers} setShoppers={setShoppers} handleCalculation={handleCalculation}/>}
      <div>
        {shoppers.map((shopper, id) => (
          <div key={id}>
            {shopper.name}, {shopper.isVegetarian ? 'true' : 'false'}, {shopper.exception}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index;
