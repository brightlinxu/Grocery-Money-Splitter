import { useState, useEffect, useRef } from "react";
import ShopperSettings from '../components/ShopperSettings.js';
import ShopperSlider from '../components/ShopperSlider.js';
import DisplayMoney from '../components/DisplayMoney.js';
import { calculate } from '../utilities/calculate.js';
import { Fade } from "react-awesome-reveal";
import 'animate.css';
import styles from '../styles/Index.module.css';
import { getWindowSize } from "../utilities/getWindowSize";

const Index = () => {
  // my states
  const [numShoppers, setNumShoppers] = useState(4);
  const [shoppers, setShoppers] = useState([]);
  const [billData, setBillData] = useState({ total: 0, nonVeg: 0 });
  const [changeInputs, setChangeInputs] = useState(true);
  const [calculated, setCalculated] = useState(false);
  const [scroll, setScroll] = useState(false);

  // new shopper
  const Shopper = {
    name: '',
    isVegetarian: false,
    exception: 0,
    moneyToPay: 0,
  }

  const handleCalculation = () => {
    setCalculated(true);
    calculate(shoppers, setShoppers, billData);
    setScroll(true);
  }

  const isMobileWindow = () => {
    return getWindowSize().width < 725;
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
        let newShoppers = [...shoppers];
        newShoppers = newShoppers.slice(0, numShoppers);
        setShoppers(newShoppers);
      }
      setChangeInputs(false);
    }
  }, [changeInputs]);


  return (
    <div className={styles.container}>
      <div className={'animate__animated animate__fadeInDown animate__faster'}>
        <div className={styles.title}>
          Grocery Money Splitter
        </div>
      </div>
      <div className={styles.inputsContainer}>
        <div className={`animate__animated ${isMobileWindow() ? 'animate__fadeInUp' : 'animate__fadeInLeft'} animate__faster`}>
          <div className={styles.sliderSubmitContainer}>
            <ShopperSlider numShoppers={numShoppers}
                           setNumShoppers={setNumShoppers}
                           setChangeInputs={setChangeInputs}
                           isMobileWindow={isMobileWindow()}
            />
            {
              !isMobileWindow() &&
              <button className={`${styles.submit} ${styles.submitWidth}`} onClick={() => handleCalculation()}>
                Calculate
              </button>
            }
          </div>
        </div>
        <div className={`animate__animated ${isMobileWindow() ? 'animate__fadeInUp' : 'animate__fadeInRight'} animate__faster`}>
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
        </div>
      </div>
      <div className={'animate__animated animate__fadeInUp animate__faster'}>
        {
          isMobileWindow() &&
            <button className={`${styles.submit} ${styles.submitWidth}`} onClick={() => handleCalculation()}>
              Calculate
            </button>
        }
      </div>
      <div className={styles.break}/>
      <div className={'animate__animated animate__fadeInUp animate__faster'}>
        <DisplayMoney shoppers={shoppers} calculated={calculated} scroll={scroll} setScroll={setScroll}/>
      </div>
    </div>
  )
}

export default Index;
