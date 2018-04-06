# genomelink-aws-lambda-demo
Demo Alexa skill showing the GENOME LINK API working in AWS Lambda with no extra modules. Also a guide below on how to use the GENOME LINK API with Alexa, including setting up Account Linking with OAuth.

Also file called keybits.js for others to use as they please to get started using the GENOME LINK API only requiring the https library.

Licensed via The Unlicense into the public domain so hopefully you can build on it!

## Oauth and the Alexa skills kit

To use the GENOME LINK API with Alexa, first register a new app in the [GENOME LINK "My Apps" page](https://genomelink.io/developers/apps/). Make sure you're logged into your own account and not a test user.

Give it any sensible name. In the GENOME LINK **Redirect URIs** field copy and paste the three **Redirect URLs** from the bottom of the **Account Linking** page in the Alexa Skills Kit Developer Console. They should look something like:
```
https://alexa.amazon.co.jp/api/skill/link/NUMBERSANDLETTERS
https://pitangui.amazon.com/api/skill/link/NUMBERSANDLETTERS
https://layla.amazon.com/api/skill/link/NUMBERSANDLETTERS
```

Create the app, and click edit on the **Authorization scopes**. Tick whichever traits you want to use in your app, then click save at the bottom.

Now in on the **Account Linking** page in the Alexa Skills Kit Developer Console enter the following details:

<dl>
  <dt>Authorization Grant Type</dt>
  <dd><code>Auth Code Grant</code></dd>
  <dt>Authorization URI</dt>
  <dd><code>https://genomelink.io/oauth/authorize</code></dd>
  <dt>Access Token URI</dt>
  <dd><code>https://genomelink.io/oauth/token</code></dd>
  <dt>Client ID</dt>
  <dd>Copy and paste your **Client id** from the GENOME LINK app page</dd>
  <dt>Client Secret</dt>
  <dd>Copy and paste your **Client secret** from the GENOME LINK app page</dd>
  <dt>Client Authentication Scheme</dt>
  <dd><code>HTTP Basic</code></dd>
  <dt>Scope</dt>
  <dd>Add so they match GENOME LINK (e.g. <code>report:blood-glucose</code>)</dd>
</dl>

You can now get the user's access token in AWS Lambda using `this.event.session.user.accessToken`.
