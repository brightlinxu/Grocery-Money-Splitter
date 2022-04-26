import { useEffect, useState } from 'react';
import Slider from 'react-input-slider';
import styles from '../styles/ShopperSlider.module.css';

const ShopperSlider = ({ numShoppers, setNumShoppers, setChangeInputs, isMobileWindow }) => {
  const [stateX, setStateX] = useState({ x: numShoppers });
  const [stateY, setStateY] = useState({ y: numShoppers });

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
    setNumShoppers(stateX.x);
  }, [stateX]);

  useEffect(() => {
    setNumShoppers(stateY.y);
  }, [stateY]);

  useEffect(() => {
    isMobileWindow ? setStateX({ x: stateY.y }) : setStateY({ y: stateX.x });
  }, [isMobileWindow]);

  return (
    <div className={styles.container}>
      <div className={styles.numberContainer}>
        <div># Shoppers:</div>
        <div className={styles.number}>{isMobileWindow ? stateX.x : stateY.y}</div>
      </div>
      {
        isMobileWindow ?
        <Slider styles={sliderStyle} axis={'x'} xmin={2} xmax={15} x={stateX.x} onChange={setStateX}
                onDragEnd={() => setChangeInputs(true)}
        />
        :
        <Slider styles={sliderStyle} axis={'y'} ymin={2} ymax={15} y={stateY.y} onChange={setStateY}
                onDragEnd={() => setChangeInputs(true)}
        />
      }
    </div>
  );
}

export default ShopperSlider;