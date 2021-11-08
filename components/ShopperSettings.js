import styles from '../styles/ShopperSettings.module.css';

const ShopperSettings = ({ shoppers, setShoppers, handleCalculation }) => {

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
    newShoppers[shopperId].exception = event.target.value;
    setShoppers(newShoppers);
  }

  return (
    <div>
      <form className={styles.columns} onSubmit={(event) => handleSubmit(event)} autoComplete='off'>
        {shoppers.map((shopper, id) => (
          <div key={id}>
            <input name={`name${id}`} type='text' value={shopper.name} onChange={(event) => handleNameChange(event, id)}/>
            <input name={`isVegetarian${id}`} type='checkbox' value={shopper.isVegetarian} onChange={(event) => handleVegeChange(event, id)}/>
            <input name={`exceptions${id}`} type='number' value={shopper.exception ? shopper.exception: ''} onChange={(event) => handleExceptChange(event, id)}/>
          </div>
        ))}
        <input type='submit' value='Calculate'/>
      </form>
    </div>
  );
}

export default ShopperSettings;