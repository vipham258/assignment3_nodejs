/**
 *  @fileOverview main file and user interface, presentation layer
 *  @author       Vi Thi Phuong Pham
 */

const { Select, Form, Input, Confirm } = require("enquirer");
const { loadCheeseRecords, saveCheeseRecords } = require("./persistence");

const OPTION_RELOAD = "Reload cheese data";
const OPTION_PERSIST = "Persist cheese data";
const OPTION_DISPLAY_ALL = "Display all records";
const OPTION_CREATE = "Create a new record";
const OPTION_EDIT = "Edit a record";
const OPTION_DELETE = "Delete a record";
const OPTION_QUIT = "Quit";

async function main() {
  let cheeseData;

  //handle exception for reading file
  try {
    cheeseData = await loadCheeseRecords();
  } catch (error) {
    console.warn("Unable to read cheese data! Exiting program");
    return;
  }

  let shouldQuit = false;
  while (!shouldQuit) {
    console.log("\nName: Vi Pham Thi Phuong 040886894");

    const mainMenuPrompt = new Select({
      name: "mainMenu",
      message: "Choose an option",
      choices: [
        OPTION_RELOAD,
        OPTION_PERSIST,
        OPTION_DISPLAY_ALL,
        OPTION_CREATE,
        OPTION_EDIT,
        OPTION_DELETE,
        OPTION_QUIT
      ]
    });

    const response = await mainMenuPrompt.run();

    if (response === OPTION_RELOAD) {
      cheeseData = await loadCheeseRecords();
      console.log("Reloaded cheese data");
    } else if (response === OPTION_PERSIST) {
      await saveCheeseRecords(cheeseData);
      console.log("Saved cheese data");
    } else if (response === OPTION_DISPLAY_ALL) {
      cheeseData.records.forEach(record => {
        console.log(record);
      });
    } else if (response === OPTION_CREATE) {
      const createPrompt = new Form({
        name: "record",
        message: "Please provide the following information:",
        choices: cheeseData.header.map(columnName => {
          return {
            name: columnName,
            message: columnName
          };
        })
      });

      const newRecord = await createPrompt.run();
      cheeseData.createRecord(newRecord);
      console.log("Created record", newRecord);
    } else if (response === OPTION_EDIT) {
      let cheeseId = undefined;
      let record = undefined;
      while (!record) {
        // find out which one to edit
        const cheeseIdPrompt = new Input({
          name: "cheeseId",
          message: "Enter CheeseId of record to edit"
        });
        cheeseId = await cheeseIdPrompt.run();

        // check if the record exists
        record = cheeseData.selectRecord(cheeseId);
        if (!record) {
          console.log("That record does not exist");
        }
      }

      // show the form
      const editPrompt = new Form({
        name: "record",
        message:
          "Edit the record below (press enter to submit, you can confirm after):",
        choices: cheeseData.header.map(columnName => {
          return {
            name: columnName,
            message: columnName,
            initial: record[columnName]
          };
        })
      });

      const updatedRecord = await editPrompt.run();

      // confirm
      console.log("Updated content for record:");
      console.log(updatedRecord);

      const confirmPromp = new Confirm({
        name: "confirm",
        message: "Keep changes?"
      });
      if (await confirmPromp.run()) {
        cheeseData.updateRecord(cheeseId, updatedRecord);
        console.log("Record updated");
      } else {
        console.log("Update canceled");
      }
      //delete option
    } else if (response === OPTION_DELETE) {
      const cheeseIdPrompt = new Input({
        name: "cheeseId",
        message: "Enter CheeseId of record to delete"
      });
      const cheeseId = await cheeseIdPrompt.run();
      cheeseData.deleteRecord(cheeseId);
      console.log("deleted", cheeseId);
    } else if (response === OPTION_QUIT) {
      break;
    }
  }
}

main();
