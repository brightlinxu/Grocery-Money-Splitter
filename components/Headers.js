import { useState } from 'react';
import styles from '../styles/Headers.module.css';

const Headers = () => {
  const [hover, setHover] = useState([false, false, false]);

  const handleEnter = (headerId) => {
    const newHover = [...hover];
    newHover[headerId] = true;
    setHover(newHover);
  }

  const handleLeave = (headerId) => {
    const newHover = [...hover];
    setHover(newHover.map(() => false));
  }

  const handleHoverFix = (headerId) => {
    const newHover = [...hover];
    setHover(newHover.map(() => false));
  }

  return (
    <div className={styles.container}>
      <div className={styles.header1} onMouseEnter={() => handleEnter(0)} onMouseLeave={() => handleLeave(0)}>
        <div style={{
            opacity: `${hover[0] ? 1 : 0}`, 
            transform: `scale(${hover[0] ? 1 : 0.1})`,
            top: `${hover[0] ? -70 : -35}px`
          }} 
          className={styles.bubble1}
          onMouseEnter={() => handleHoverFix(0)}
        >
          Shopper&apos;s name
        </div>
        Name:
      </div>
      <div className={styles.header2} onMouseEnter={() => handleEnter(1)} onMouseLeave={() => handleLeave(1)}>
        <div style={{
            opacity: `${hover[1] ? 1 : 0}`,
            transform: `scale(${hover[1] ? 1 : 0.1})`,
            top: `${hover[1] ? -70 : -35}px`
          }} 
          className={styles.bubble2}
          onMouseEnter={() => handleHoverFix(1)}
        >
          Select if shopper is vegetarian
        </div>
        Vegetarian:
      </div>
      <div className={styles.header3} onMouseEnter={() => handleEnter(2)} onMouseLeave={() => handleLeave(2)}>
        <div style={{
            opacity: `${hover[2] ? 1 : 0}`,
            transform: `scale(${hover[2] ? 1 : 0.1})`,
            top: `${hover[2] ? -87.7 : -45}px`,
          }} 
          className={styles.bubble3}
          onMouseEnter={() => handleHoverFix(2)}
        >
          Cost of anything shopper bought individually
        </div>
        Extra Personal Costs:
      </div>
    </div>
  );
}

export default Headers;