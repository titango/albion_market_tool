const path = require("path");
const fs = require("fs");

const simplifyList = async function simplifyList() {
  const data = fs.readFileSync(path.resolve(__dirname, './items.json'),'utf-8');
  if(data)
  {
    let newData = (JSON.parse(data)).map((v) => {
      // console.log("each v: ", v);
      let tryLocalName = v.LocalizedNames? (v.LocalizedNames['EN-US']? v.LocalizedNames['EN-US'] : "") : "";
      let tryLocalDesc = v.LocalizedDescriptions? (v.LocalizedDescriptions['EN-US'] ? v.LocalizedDescriptions['EN-US'] : "") : "";
      return {
        id: v.Index? v.Index : "",
        name: v.UniqueName? v.UniqueName : "",
        local_name: tryLocalName,
        local_desc: tryLocalDesc
      }
    });
    fs.writeFileSync(path.resolve(__dirname, './items_simplified.json'), JSON.stringify(newData));
  }
}

const readFileList = async function readFileList() {
  const data = fs.readFileSync(path.resolve(__dirname, './items_simplified.json'),'utf-8');
  if (!data) throw data;
  if(data)
  {
    return data;
  }
}

module.exports = {
  simplifyList, readFileList
}