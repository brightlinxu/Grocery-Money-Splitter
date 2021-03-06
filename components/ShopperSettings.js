import { Fade } from "react-awesome-reveal";
import FadeIn from 'react-fade-in';
import Headers from '../components/Headers.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from '../styles/ShopperSettings.module.css';

const ShopperSettings = ({ shoppers, setShoppers, handleCalculation, billData, setBillData }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // tell index component to do calculations
    handleCalculation();
  }

  const handleKeyDown = (event) => {
    if (event.which === 38 || event.which === 40) {
      event.preventDefault();
    } 
  }

  const handleNameChange = (event, shopperId) => {
    const newShoppers = [...shoppers];
    newShoppers[shopperId].name = event.target.value;
    setShoppers(newShoppers);
  }

  const handleVegeChange = (event, shopperId) => {
    const newShoppers = [...shoppers];
    newShoppers[shopperId].isVegetarian = event.target.checked;
    setShoppers(newShoppers);
  }

  const handleExceptChange = (event, shopperId) => {
    const newShoppers = [...shoppers];
    newShoppers[shopperId].exception = event.target.value === '' ? 0 : event.target.value;
    setShoppers(newShoppers);
  }

  const handleTotalChange = (event) => {
    const newTotal = event.target.value === '' ? 0 : event.target.value;
    setBillData({...billData, total: newTotal});
  }
  
  const handleNVChange = (event) => {
    const newNonVeg = event.target.value === '' ? 0 : event.target.value;
    setBillData({...billData, nonVeg: newNonVeg});
  }


  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)} autoComplete='off'>
        <div className={styles.columns}>
          <div className={styles.floatingInput}>
            <input
              name='totalBill' type='number' step='0.01'
              value={billData.total !== 0 ? billData.total : ''}
              onChange={(event) => handleTotalChange(event)}
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <label className={billData.total && styles.filled}>
              Enter total bill... ($)
            </label>
          </div>
          <div className={styles.floatingInput}>
            <input
                name='nonVegBill' type='number' step='0.01'
                value={billData.nonVeg !== 0 ? billData.nonVeg : ''}
                onChange={(event) => handleNVChange(event)}
                onWheel={(e) => e.target.blur()}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            <label className={billData.nonVeg && styles.filled}>
              Enter non-vegetarian bill... ($)
            </label>
          </div>
          <Headers />
          <TransitionGroup component='div'>
            {shoppers.map((shopper, id) => (
              <CSSTransition key={id} timeout={700} classNames={'fade'}>
                <div key={id} className={styles.shopperInputsContainer}>
                  <input className={styles.shopperInput1}
                    name={`name${id}`} type='text'
                    placeholder={`Shopper ${id + 1}`}
                    value={shopper.name}
                    onChange={(event) => handleNameChange(event, id)}
                  />
                  <input className={styles.shopperInput2}
                    name={`isVegetarian${id}`} type='checkbox'
                    value={shopper.isVegetarian}
                    onChange={(event) => handleVegeChange(event, id)}
                  />
                  <input className={styles.shopperInput3}
                    name={`exceptions${id}`} type='number'
                    step='0.01' placeholder='0'
                    value={shopper.exception !== 0 ? shopper.exception: ''}
                    onChange={(event) => handleExceptChange(event, id)}
                    onWheel={(e) => e.target.blur()}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </form>
    </div>
  );
}

export default ShopperSettings;

// feature: when hover over "name", "vegetarian", and "extra personal costs",
// add a little pop up menu that describes the category a little more