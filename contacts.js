import { readFile, writeFile } from "node:fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import colors from "colors";
import { randomUUID } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = `${__dirname}\\db\\contacts.json`;

export async function listContacts() {
  try {
    console.log("Contacts list".bgBlue);
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    console.table(contacts);
  } catch (error) {
    console.log("There is an error".bgRed.white);
    console.error(error);
  }
}

export async function getContactById(contactId) {
  try {
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index > -1) {
      console.log(`Contact details are:`.bgBlue);
      console.log(contacts[index]);
    } else {
      console.log("There is no contact with this ID".bgRed.white);
    }
  } catch (error) {
    console.log("There is an error".bgRed.white);
    console.error(error);
  }
}

export async function removeContact(contactId) {
  try {
    console.log("DELETE contact".bgBlue);
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index > 0) {
      contacts.splice(index, 1);
      const parsedContacts = JSON.stringify(contacts);
      await writeFile(contactsPath, parsedContacts);

      console.log("The contact has been succesfully deleted".bgGreen);
    } else {
      console.log("There is no contact with this ID".bgRed.white);
    }
  } catch (error) {
    console.log("There is an error".bgRed.white);
    console.error(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    console.log("ADD contact".bgBlue);
    const isValid = name && email && phone;
    if (!isValid) {
      throw new Error(
        "The contact does not have all required data (name, email, and phone!"
      );
    }
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    const newContact = {
      id: randomUUID(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    const parsedContacts = JSON.stringify(contacts);
    await writeFile(contactsPath, parsedContacts);

    console.log("The contact has been succesfully added".bgGreen);
  } catch (error) {
    console.log("There is an error".bgRed.white);
    console.error(error);
  }
}
