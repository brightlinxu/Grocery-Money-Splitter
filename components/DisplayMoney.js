import { useEffect, useRef } from 'react';
import styles from '../styles/DisplayMoney.module.css';

const DisplayMoney = ({ shoppers, calculated, scroll, setScroll }) => {
  // initializing ref for scrollIntoView
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scroll) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({behavior: 'smooth'});
      }, 30);
      setScroll(false);
    }
  }, [scroll]);


  if (!calculated) {
    return (
      <div className={styles.container}>
        Fill in the grocery shopping info above and click Calculate
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Money to request from each shopper</div>
      <div className={styles.shopperList}>
        <div className={styles.nameContainer}>
          {shoppers.map((shopper, id) => (
            <div key={id} className={styles.eltSpacing}>
              {shopper.name === '' ? `Shopper ${id + 1}` : shopper.name}
            </div>
          ))}
        </div>
        <div className={styles.moneyContainer}>
          {shoppers.map((shopper, id) => (
            <div key={id} className={styles.eltSpacing}>
              ${shopper.moneyToPay}
            </div>
          ))}
        </div>
      </div>
      <div ref={scrollRef} className={styles.scrollPos} />
    </div>
  );
}

export default DisplayMoney;
