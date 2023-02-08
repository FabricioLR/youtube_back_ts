import * as admin from "firebase-admin"

const Bucket = "teste-javascript-2062a.appspot.com"
const serviceAccount = {
    type: process.env.type as string,
    project_id: process.env.project_id as string,
    private_key_id: process.env.private_key_id as string,
    private_key: (process.env.private_key  as string).replace(/\\n/g, '\n'),
    client_email: process.env.client_email as string,
    client_id: process.env.client_id as string,
    auth_uri: process.env.auth_uri as string,
    token_uri: process.env.token_uri as string,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url as string,
    client_x509_cert_url: process.env.client_x509_cert_url as string,
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as string | admin.ServiceAccount),
    storageBucket: Bucket
})

const storage = admin.storage().bucket()

export default storage