import { useState, useEffect } from "react";
import ShopperSettings from '../components/ShopperSettings.js';
import ShopperSlider from '../components/ShopperSlider.js';
import { calculate } from '../utilities/calculate.js';
import { Fade, Slide } from "react-awesome-reveal";
import styles from '../styles/Index.module.css';

const Index = () => {
  const [numShoppers, setNumShoppers] = useState(4);
  const [shoppers, setShoppers] = useState([]);
  const [billData, setBillData] = useState({ total: 0, nonVeg: 0 });
  const [changeInputs, setChangeInputs] = useState(true);

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
    if (changeInputs) {
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
    }

  }, [changeInputs]);


  return (
    <div className={styles.container}>
      <Fade direction={'down'} duration={700} triggerOnce>
        <div className={styles.title}>
          Grocery Money Splitter
        </div>
      </Fade>
      <div className={styles.inputsContainer}>
        <Fade direction={'left'} duration={700} triggerOnce>
          <ShopperSlider numShoppers={numShoppers} setNumShoppers={setNumShoppers} setChangeInputs={setChangeInputs}/>
        </Fade>
        <Fade direction={'right'} duration={650} triggerOnce>
          <div>
            {
            shoppers.length !== 0 && 
            <ShopperSettings shoppers={shoppers} 
              setShoppers={setShoppers} 
              handleCalculation={handleCalculation}
              billData={billData}
              setBillData={setBillData}
              />
            }
          </div>
        </Fade>
      </div>
      
      {/*
      <div>
        {shoppers.map((shopper, id) => (
          <div key={id}>
            {shopper.name}: ${shopper.moneyToPay}, {shopper.isVegetarian ? 'true' : 'false'}
          </div>
        ))}
      </div>
      */}

      {/*
      <DropdownMenu setNumShoppers={setNumShoppers}/>
      */}
      
      {/*<div>
        total bill: {billData.total}, nonVeg bill: {billData.nonVeg}
      </div>*/}
    </div>
  )
}

export default Index;
