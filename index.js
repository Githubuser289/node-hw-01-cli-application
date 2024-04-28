import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      if (id) {
        getContactById(id);
      } else {
        console.log("get parameter must be accompanied by an user ID".bgRed);
      }
      break;

    case "add":
      if (name && email && phone) {
        addContact(name, email, phone);
      } else {
        console.log(
          "add parameter must be accompanied by user's name, email, and phone"
            .bgRed
        );
      }
      break;

    case "remove":
      if (id) {
        removeContact(id);
      } else {
        console.log("remove parameter must be accompanied by an user ID".bgRed);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
