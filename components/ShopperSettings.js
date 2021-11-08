import styles from '../styles/ShopperSettings.module.css';

const ShopperSettings = ({ shoppers, setShoppers }) => {

  /*
  const clearForms = () => {
    const newShoppers = [...shoppers];
    newShoppers.forEach((shopper) => {
      shopper.formValue = '';
    });
    setShoppers(newShoppers);
  }
  */

  const handleSubmit = (event) => {
    event.preventDefault();

    // time for calculations here
    
    clearForms();
  }

  const handleChange = (event, shopperId) => {
    const newShoppers = [...shoppers];
    newShoppers[shopperId].name = event.target.value;
    setShoppers(newShoppers);
  }

  return (
    <div>
      <form className={styles.columns} onSubmit={(event) => handleSubmit(event)} autoComplete='off'>
        {shoppers.map((shopper, id) => (
          <div key={id}>
            <input name={`name${id}`} type='text' value={shopper.name} onChange={(event) => handleChange(event, id)}/>
            <input name={`isVegetarian${id}`} type='checkbox' />
            <input name={`exceptions${id}`} type='number'/>
          </div>
        ))}
        <input type='submit' value='Calculate'/>
      </form>
    </div>
  );
}

export default ShopperSettings;