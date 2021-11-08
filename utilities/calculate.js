export const calculate = (shoppers, setShoppers, billData) => {
  const getTotalExcept = () => {
    let sum = 0;
    shoppers.forEach((shopper) => {
      sum += shopper.exception;
    });

    return sum;
  }

  const getNumVeg = () => {
    let sum = 0;
    shoppers.forEach((shopper) => {
      if (shopper.isVegetarian) ++sum;
    });

    return sum;
  }

  // temporary variables used for calculations
  const totalMinusExcept = billData.total - getTotalExcept();
  const vegBill = totalMinusExcept - billData.nonVeg;
  const numShoppers = shoppers.length;
  const numVeg = getNumVeg();
  const numNonVeg = numShoppers - numVeg;

  // calculate price for each shopper
  shoppers.forEach((shopper, id) => {
    let vegCost = vegBill / numShoppers;
    let nonVegCost = 0;
    if (!shopper.isVegetarian) {
      nonVegCost = (billData.nonVeg / numNonVeg);
    }
    let totalMoney = vegCost + nonVegCost + parseFloat(shopper.exception);

    const newShoppers = [...shoppers];
    newShoppers[id].moneyToPay = totalMoney.toFixed(2);
    setShoppers(newShoppers);
  });
}