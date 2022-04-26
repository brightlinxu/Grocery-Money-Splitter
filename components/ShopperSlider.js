import { useEffect, useState } from 'react';
import Slider from 'react-input-slider';
import styles from '../styles/ShopperSlider.module.css';

const ShopperSlider = ({ numShoppers, setNumShoppers, setChangeInputs }) => {
  const [state, setState] = useState({ y: numShoppers });

  const sliderStyle = {
    active: {
      backgroundColor: '#00682F'
    },
    thumb: {
      width: 23,
      height: 23,
      backgroundColor: '#F8F8FF'
    },
  };

  useEffect(() => {
    setNumShoppers(state.y);
  }, [state]);

  return (
    <div className={styles.container}>
      <div className={styles.numberContainer}>
        <div># Shoppers:</div>
        <div className={styles.number}>{state.y}</div>
      </div>
      <Slider styles={sliderStyle} axis='y' ymin={2} ymax={15} y={state.y} onChange={setState} 
        onDragEnd={() => setChangeInputs(true)}
      />
    </div>
  );
}

export default ShopperSlider;