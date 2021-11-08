import { useState, useEffect } from "react";
import DropdownMenu from '../components/DropdownMenu.js';
import ShopperSettings from '../components/ShopperSettings.js';
import { calculate } from '../utilities/calculate.js';
import styles from '../styles/Index.module.css';

const Index = () => {
  const [numShoppers, setNumShoppers] = useState(0);
  const [shoppers, setShoppers] = useState([]);
  const [billData, setBillData] = useState({ total: 0, nonVeg: 0 });

  // new shopper
  const Shopper = {
    name: '',
    isVegetarian: false,
    exception: 0,
    moneyToPay: 0,
  }

  const handleCalculation = () => {
    calculate(shoppers, setShoppers, billData);
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

  useEffect(() => {
    console.log(shoppers);
  }, [shoppers]);


  return (
    <div className={styles.container}>
      <DropdownMenu setNumShoppers={setNumShoppers}/>
      {
      shoppers.length !== 0 && 
      <ShopperSettings shoppers={shoppers} 
        setShoppers={setShoppers} 
        handleCalculation={handleCalculation}
        billData={billData}
        setBillData={setBillData}
        />
      }
      <div>
        {shoppers.map((shopper, id) => (
          <div key={id}>
            {shopper.name}: ${shopper.moneyToPay}
          </div>
        ))}
      </div>
      {/*<div>
        total bill: {billData.total}, nonVeg bill: {billData.nonVeg}
      </div>*/}
    </div>
  )
}

export default Index;
