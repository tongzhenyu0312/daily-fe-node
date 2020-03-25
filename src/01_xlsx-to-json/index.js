let path = require('path');
let xlsxHelper = require('node-xlsx');
let fs = require('fs');
let filePath = path.resolve(__dirname, 'city.xlsx');
// console.log(filePath);
const xlsxData = xlsxHelper.parse(filePath)[0].data;
// console.log(xlsxData);
const result = [];
const data = xlsxData.slice(1).forEach(([provinceName, provinceGuid, cityName, cityCode]) => { 
  result.push({
    provinceName,
    provinceGuid,
    cityName,
    cityCode,
  })
})
// console.log(result);
const res = [];
result.reduce((prev, cur) => { 
  const ind = prev.findIndex(item => item.guid === cur.provinceGuid);
  let tar = {
    guid: cur.provinceGuid,
    name: cur.provinceName,
    citys: [],
  }
  if (ind >= 0) {
    prev[ind].citys.push({
      code: cur.cityCode,
      name: cur.cityName,
    })
  } else { 
    tar.citys.push({
      code: cur.cityCode,
      name: cur.cityName,
    })
    prev.push(tar);
  }
  return prev;
}, res)
console.log(res);

fs.writeFileSync('./city.json', JSON.stringify(res));