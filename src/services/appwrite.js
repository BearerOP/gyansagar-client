import {
    Client,
    Account
} from "appwrite"

const client = 
new Client()
.setProject(import.meta.env.VITE_APP_PROJECT_ID_DEPLOYED) // Your project ID
.setEndpoint(import.meta.env.VITE_APP_ENDPOINT_API) // Your API Endpoint

const account = new Account(client)

export {
    account,
    client
}