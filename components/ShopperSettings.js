import styles from '../styles/ShopperSettings.module.css';

const ShopperSettings = ({ shoppers, setShoppers, handleCalculation, billData, setBillData }) => {

  const handleSubmit = (event) => {
    event.preventDefault();

    // tell index component to do calculations
    handleCalculation();
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
      <form className={styles.columns} onSubmit={(event) => handleSubmit(event)} autoComplete='off'>
        <input name='totalBill' type='number' step='0.01' value={billData.total !== 0 ? billData.total : ''} onChange={(event) => handleTotalChange(event)}/>
        <input name='nonVegBill' type='number' step='0.01' value={billData.nonVeg !== 0 ? billData.nonVeg : ''} onChange={(event) => handleNVChange(event)}/>
        {shoppers.map((shopper, id) => (
          <div key={id}>
            <input name={`name${id}`} type='text' value={shopper.name} onChange={(event) => handleNameChange(event, id)}/>
            <input name={`isVegetarian${id}`} type='checkbox' value={shopper.isVegetarian} onChange={(event) => handleVegeChange(event, id)}/>
            <input name={`exceptions${id}`} type='number' step='0.01' value={shopper.exception !== 0 ? shopper.exception: ''} onChange={(event) => handleExceptChange(event, id)}/>
          </div>
        ))}
        <input type='submit' value='Calculate'/>
      </form>
    </div>
  );
}

export default ShopperSettings;