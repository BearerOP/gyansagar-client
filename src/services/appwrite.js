import {
    Client,
    Account
} from "appwrite"

const client = 
new Client()
.setProject('66f45ab3001424d8ac99') // Your project ID
.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint

const account = new Account(client)

export {
    account,
    client
}