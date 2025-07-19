
# Problem 5 - CRUD User API (MongoDB/Express/TypeScript)

## Setup Instructions

### 1. Install Dependencies
Run the following command in the project root:

```bash
npm install
```

### 2. Set Environment Variables
Create a `.env` file in the problem5 directory and add:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=your_target_port
```

If not set, the app will use the default connection string in the code. Since this is demo version so the real database user will be use, but it will be revoke after 5 days. 

### 3. Run the Application
To start the application in development mode:
```bash
npm run problem5
```

### 4. Test the APIs

For time saving, we use Postman to test the APIs instead of Jest. You can find a Postman collection in `Resources.postman_collection.json`.

Alternatively, you can use curl commands:

- **Create user**
```bash
curl --location 'http://localhost:3001/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "name",
    "email": "test@gmail.com",
    "age": 25,
    "summary": "A short summary",
    "isActive": true
}'
```

- **Search user**
```bash
curl --location 'http://localhost:3001/api/users?email=test'
```

- **Get user detail**
```bash
curl --location 'http://localhost:3001/api/users/<id>'
```
Replace `<id>` with an existing user ID.

- **Update user**
```bash
curl --location --request PATCH 'http://localhost:3001/api/users/<id>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "name1",
    "email": "test@gmail.com",
    "age": 26,
    "summary": "Updated summary",
    "isActive": false
}'
```
Replace `<id>` with an existing user ID.

- **Delete user**
```bash
curl --location --request DELETE 'http://localhost:3001/api/users/<id>'
```
Replace `<id>` with an existing user ID.