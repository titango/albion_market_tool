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

export const millisecondsToHuman = (duration) => {
  var seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);
  var color = "gray";
  if(hours == 0)
  {
    if(minutes > 30)
    {
      color = "#b3b300"; // yellow
    }else {
      color = "green";
    }
  }else if(hours == 1)
  {
    color = "orange";
  }else {
    color = "red";
  }
    return {time: hours + "h" + minutes + "m" + seconds, color: color};
}