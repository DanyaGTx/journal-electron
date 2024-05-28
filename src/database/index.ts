import { Account, Client, Databases, Storage } from "appwrite";
import { APP_WRITE_ID } from "./constants";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(APP_WRITE_ID);

const account = new Account(client);
const storage = new Storage(client);
const DB = new Databases(client);

export { client, account, DB, storage };

export { ID } from "appwrite";
