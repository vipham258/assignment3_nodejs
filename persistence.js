/**
 *  @fileOverview something something
 *  @author       Vi Thi Phuong Pham
 */

//import fs, readline
const fs = require("fs");
const readline = require("readline");

/** @typedef {{
  CheeseId: string,
  CheeseNameEn: string,
  ManufacturerNameEn:string,
  ManufacturerProvCode:string,
  ManufacturingTypeEn:string, 
  WebSiteEn:string,
  FatContentPercent:string, 
  MoisturePercent:string,
  ParticularitiesEn:string, 
  FlavourEn:string,
  CharacteristicsEn:string, 
  RipeningEn:string,
  Organic:string, 
  CategoryTypeEn:string,
  MilkTypeEn:string, 
  MilkTreatmentTypeEn:string,
  RindTypeEn:string, 
  LastUpdateDate: string
}} CheeseRecord */

/** @typedef {{ 
    records: CheeseRecord[],
    header: string[],
    createRecord: (record: CheeseRecord) => void,
    selectRecord: (cheeseId: string) => CheeseRecord,
    updateRecord: (cheeseId: string, record: CheeseRecord) => void,
    deleteRecord: (cheeseId: string) => void
  }} CheeseData */

/**
 *
 * @param {CheeseRecord[]} records
 * @param {string[]} header
 * @returns {CheeseData}
 */
function createCheeseData(records, header) {
  return {
    records,
    header,

    createRecord(record) {
      records.push(record);
    },

    selectRecord(cheeseId) {
      return records.find(record => record.CheeseId === cheeseId);
    },

    updateRecord(cheeseId, record) {
      const index = records.findIndex(record => record.CheeseId === cheeseId);
      if (index !== -1) {
        Object.assign(records[index], record);
      }
    },

    deleteRecord(cheeseId) {
      const index = records.findIndex(record => record.CheeseId === cheeseId);
      if (index !== -1) {
        records.splice(index, 1);
      }
    }
  };
}

//0 CheeseId,
//1 CheeseNameEn,
//2 CheeseNameFr,
//3 ManufacturerNameEn,
//4 ManufacturerNameFr,
//5 ManufacturerProvCode,
//6 ManufacturingTypeEn,
//7 ManufacturingTypeFr,
//8 WebSiteEn,
//9 WebSiteFr,
//10 FatContentPercent,
//11 MoisturePercent,
//12 ParticularitiesEn,
//13 ParticularitiesFr,
//14 FlavourEn,
//15 FlavourFr,
//16 CharacteristicsEn,
//17 CharacteristicsFr,
//18 RipeningEn,
//19 RipeningFr,
//20 Organic,
//21 CategoryTypeEn,
//22 CategoryTypeFr,
//23 MilkTypeEn,
//24 MilkTypeFr,
//25 MilkTreatmentTypeEn,
//26 MilkTreatmentTypeFr,
//27 RindTypeEn,
//28 RindTypeFr,
//29 LastUpdateDate

let columnIndex = [
  0,
  1,
  3,
  5,
  6,
  8,
  10,
  11,
  12,
  14,
  16,
  18,
  20,
  21,
  23,
  25,
  27,
  29
];

/**
 * @returns {Promise<CheeseData>} Cheese file data structure
 */
function loadCheeseRecords() {
  return new Promise((resolve, reject) => {
    let path = "canadianCheeseDirectory.csv";
    let max = 10;
    let counter = 0;

    //regex expression for (,)
    const regex = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/;

    //create an array of rows
    let rows = [];

    // read row data from file
    let readFile = fs.createReadStream(path);

    readFile.on("error", error => {
      reject(error);
    });

    let rl = readline.createInterface({ input: readFile });

    rl.on("line", d => {
      //put the line into an array
      let totalRow = d.split(regex);

      //loop through to get selected columns
      let row = [];
      for (const col of columnIndex) {
        row.push(totalRow[col]);
      }
      rows.push(row);

      if (counter++ >= max) {
        //stop reading
        rl.close();
        rl.removeAllListeners();
      }
    });

    rl.on("close", () => {
      // finished reading, turn rows into records
      // console.log(rows);

      //put the first array of rows into header(column names)
      let header = rows[0];
      // remove weird character in front of CheeseId
      header[0] = header[0].slice(1);

      //put the leftover data into data array
      let data = rows.slice(1);

      //convert rows into objects
      /** @type {CheeseRecord[]} */
      const records = data.map(rowData => {
        //create object obj
        const cheeseRecord = {};
        //for each header, put data into object
        header.forEach((headerName, colIndex) => {
          cheeseRecord[headerName] = rowData[colIndex];
        });

        return cheeseRecord;
      });

      resolve(createCheeseData(records, header));
    });
  });
}

/**
 *
 * @param {CheeseData} cheeseData A modified copy of the data structure from loadCheeseRecords
 */
function saveCheeseRecords(cheeseData) {
  return new Promise((resolve, reject) => {
    const path = "output.csv";

    const data =
      cheeseData.header +
      "\n" +
      cheeseData.records
        .map(record =>
          cheeseData.header.map(columnName => record[columnName]).join(",")
        )
        .join("\n");

    fs.writeFile(path, data, error => {
      if (error) {
        reject(error);
      }
      resolve(error);
    });
  });
}

module.exports = {
  createCheeseData,
  loadCheeseRecords,
  saveCheeseRecords
};
