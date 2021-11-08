import { useEffect, useState } from 'react';
import MenuItems from './MenuItems.js';
import styles from '../styles/DropdownMenu.module.css';

const DropdownMenu = ({ setNumShoppers }) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <div className={styles.menu} 
      onMouseEnter={() => setShowItems(true)} 
      onMouseLeave={() => setShowItems(false)}
      >
      Number of Shoppers
      <div>
        {
        showItems &&
        <MenuItems setNumShoppers={setNumShoppers} setShowItems={setShowItems}/>
        }
      </div>
    </div>
  );
}

export default DropdownMenu;