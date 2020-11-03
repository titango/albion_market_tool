export const convertDataFromMarketplace = (dataFromApi) => {
  let dataReturn = [];

  dataFromApi.forEach((v) => {

    let tryFound = dataReturn.find((vf) => {
      return vf.name == v.item_id;
    })

    if(!tryFound)
    {
      let newObj = {
        name: v.item_id,
        data: [{
          city: v.city,
          sell_price_min: v.sell_price_min,
          sell_price_min_date: v.sell_price_min_date
        }]
      }
      dataReturn.push(newObj);
    }else {
      tryFound.data.push({
        city: v.city,
        sell_price_min: v.sell_price_min,
        sell_price_min_date: v.sell_price_min_date
      })
      tryFound.data.sort((a,b) => b.city - a.city);
    }
  })

  console.log("dataReturn: ", dataReturn);

  return dataReturn;
}