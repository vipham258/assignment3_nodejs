const { createCheeseData } = require("./persistence");

const testRecords = [
  {
    CheeseId: "374",
    CheeseNameEn: "Goat Brie (Woolwich)",
    ManufacturerNameEn: "Woolwich Dairy",
    ManufacturerProvCode: "ON",
    ManufacturingTypeEn: "Industrial",
    WebSiteEn: "http://www.woolwichdairy.com",
    FatContentPercent: "22",
    MoisturePercent: "52",
    ParticularitiesEn: '"Rennet free, ripens from the outside in"',
    FlavourEn: '"Rich, creamy, buttery, both subtle and tangy in taste"',
    CharacteristicsEn: "",
    RipeningEn: "Less than 1 Month",
    Organic: "0",
    CategoryTypeEn: "Soft Cheese",
    MilkTypeEn: "Goat",
    MilkTreatmentTypeEn: "Pasteurized",
    RindTypeEn: "Bloomy Rind",
    LastUpdateDate: "2016-02-03"
  },
  {
    CheeseId: "375",
    CheeseNameEn: "Goat Cheddar (Woolwich)",
    ManufacturerNameEn: "Woolwich Dairy",
    ManufacturerProvCode: "ON",
    ManufacturingTypeEn: "Industrial",
    WebSiteEn: "http://www.woolwichdairy.com",
    FatContentPercent: "29",
    MoisturePercent: "41",
    ParticularitiesEn: '"Medium Aged, rennet free"',
    FlavourEn: "Mild",
    CharacteristicsEn: '"Whitem, smooth, firm textured"',
    RipeningEn: "4 Months",
    Organic: "0",
    CategoryTypeEn: "Firm Cheese",
    MilkTypeEn: "Goat",
    MilkTreatmentTypeEn: "Pasteurized",
    RindTypeEn: "",
    LastUpdateDate: "2016-02-03"
  },
  {
    CheeseId: "376",
    CheeseNameEn: "Goat Mozarella (Woolwich)",
    ManufacturerNameEn: "Woolwich Dairy",
    ManufacturerProvCode: "ON",
    ManufacturingTypeEn: "Industrial",
    WebSiteEn: "http://www.woolwichdairy.com",
    FatContentPercent: "22",
    MoisturePercent: "50",
    ParticularitiesEn: "Rennet free",
    FlavourEn: "Mild",
    CharacteristicsEn: "",
    RipeningEn: "",
    Organic: "0",
    CategoryTypeEn: "Semi-soft Cheese",
    MilkTypeEn: "Goat",
    MilkTreatmentTypeEn: "Pasteurized",
    RindTypeEn: "",
    LastUpdateDate: "2016-02-03"
  },
  {
    CheeseId: "378",
    CheeseNameEn: "Goat Feta (Woolwich)",
    ManufacturerNameEn: "Woolwich Dairy",
    ManufacturerProvCode: "ON",
    ManufacturingTypeEn: "Industrial",
    WebSiteEn: "http://www.woolwichdairy.com",
    FatContentPercent: "22",
    MoisturePercent: "55",
    ParticularitiesEn: "Rennet free",
    FlavourEn: '"Sharp, tangy, salty"',
    CharacteristicsEn: "With or without brine",
    RipeningEn: "Less than 1 Month",
    Organic: "0",
    CategoryTypeEn: "Soft Cheese",
    MilkTypeEn: "Goat",
    MilkTreatmentTypeEn: "Pasteurized",
    RindTypeEn: "",
    LastUpdateDate: "2016-02-03"
  }
];

const testHeader = [
  "CheeseId",
  "CheeseNameEn",
  "ManufacturerNameEn",
  "ManufacturerProvCode",
  "ManufacturingTypeEn",
  "WebSiteEn",
  "FatContentPercent",
  "MoisturePercent",
  "ParticularitiesEn",
  "FlavourEn",
  "CharacteristicsEn",
  "RipeningEn",
  "Organic",
  "CategoryTypeEn",
  "MilkTypeEn",
  "MilkTreatmentTypeEn",
  "RindTypeEn",
  "LastUpdateDate"
];

test("records can be deleted", () => {
  const data = createCheeseData(testRecords, testHeader);
  expect(data.selectRecord("376")).toBeTruthy();
  data.deleteRecord("376");
  expect(data.selectRecord("376")).toBeFalsy();
});
