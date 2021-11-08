import styles from '../styles/MenuItems.module.css';

const MenuItems = ({ setNumShoppers, setShowItems }) => {
  const options = Array.from({length: 14}, (_, i) => i + 2);

  const handleClick = (option) => {
    setNumShoppers(option);
    setShowItems(false);
  }

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <div key={option} className={styles.item}
          onClick={() => handleClick(option)}>
          {option}
        </div>
      ))}
    </div>
  );
}

export default MenuItems;