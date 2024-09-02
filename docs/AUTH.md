# Authorization

To prove your identity you use the ``http://localhost:3000/api/v1/auth/login`` to login you need to have an Client Id
which is set in the cookies as a UUID.

## Start

To send request setup a cookie that has the key ``clid`` (**Cl**ient **Id**entifier) add as value your random generated
UUID, like:

````cookie
clid=UUID; Expires=Session; Domain=localhost; Path=/
````

### Register

After you added your cookie register if you haven't created an account yet.

`````http request
http://localhost:3000/api/v1/auth/register
`````

Dont forget to provide necessary information, in your request body:

````json
{
  "email": "your_email",
  "password": "your_password",
  "confirmPassword": "confirm_your_password",
  "username": "your_username",
  "display_name": "your_display_name"
}
````

### Login

Now to get the ``sid`` (SessionId), ``uid`` (UserId), `token` (Token) and `email` (User email), send a request to:

````http request
http://localhost:3000/api/v1/auth/login
````

Set in the body your credentials, like:

````json
{
  "email": "your_email",
  "password": "your_password"
}
````

## Saving Data

It's important to save the login response data. To save the data in your client it's over to your credentials, but if
you are using an API Tool like:

- Insomnia
- Postman

Saving your data in a environment variable is useful, to save data in Insomnia save this in your ``POST Login``, simply
add this after response script:

### Insomnia

````js
const jsonBody = insomnia.response.json();
insomnia.environment.set("email", jsonBody.body.email)
insomnia.environment.set("token", jsonBody.body.token);
insomnia.environment.set("user_id", jsonBody.body.uid);
insomnia.environment.set("session_token", jsonBody.body.sid);
````

### Postman

````js
const jsonBody = pm.response.json();
pm.environment.set("email", jsonBody.body.email)
pm.environment.set("token", jsonBody.body.token);
pm.environment.set("user_id", jsonBody.body.uid);
pm.environment.set("session_token", jsonBody.body.sid);
````

# Now your all set to start using the API