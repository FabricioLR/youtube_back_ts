import * as admin from "firebase-admin"

const Bucket = "teste-javascript-2062a.appspot.com"
const serviceAccount = {
    type: process.env.TYPE as string,
    project_id: process.env.PROJECT_ID as string,
    private_key_id: process.env.PRIVATE_KEY_ID as string,
    private_key: (process.env.PRIVATE_KEY  as string).replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL as string,
    client_id: process.env.CLIENT_ID as string,
    auth_uri: process.env.AUTH_URI as string,
    token_uri: process.env.TOKEN_URI as string,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL as string,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL as string,
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as string | admin.ServiceAccount),
    storageBucket: Bucket
})

const storage = admin.storage().bucket()

export default storage