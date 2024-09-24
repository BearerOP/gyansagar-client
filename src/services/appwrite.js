import {
    Client,
    Account
} from "appwrite"

const client = 
new Client()
.setProject('66f27d6c00269c700a50') // Your project ID
.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint

const account = new Account(client)

export {
    account,
    client
}