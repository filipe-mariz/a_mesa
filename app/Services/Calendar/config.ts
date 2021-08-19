import fs from 'fs'
import readline from 'readline'
import { google } from 'googleapis'
import Env from '@ioc:Adonis/Core/Env'

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.events']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'à_mesa_back/app/Services/Calendar/token.json'
const REFRESH_TOKEN_PATH = 'à_mesa_back/app/Services/Calendar/refresh-token.json'

/**
 * Create an OAuth2 client with the given credentials
 */
export function authorize() {
  const GOOGLE_OAUTH_CLIENT_SECRET = Env.get('GOOGLE_OAUTH_CLIENT_SECRET')
  const GOOGLE_OAUTH_CLIENT_ID = Env.get('GOOGLE_OAUTH_CLIENT_SECRET')

  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET,
  )

  google.options({
    auth: oAuth2Client,
  })

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client)
    oAuth2Client.setCredentials(JSON.parse((token as unknown) as string))

    console.log('===> GOOGLE CLIENT AUTHORIZED ✅\n')
  })

  // Leaves a socket open to check if the access token is still valid
  oAuth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      fs.writeFile(REFRESH_TOKEN_PATH, JSON.stringify(tokens), (err) => {
        if (err) return console.error(err)
        console.log('===> GOOGLE CLIENT AUTHORIZE REFRESHED ✅\n')
      })
    }
  })
}

/**
 * Get and store new token after prompting for user authorization
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)

        console.log('===> GOOGLE CLIENT AUTHORIZED ✅\n')
      })
    })
  })
}
