# 🧩 Update Score API Module

This backend module is responsible for securely updating a user's score and broadcasting leaderboard changes to all connected clients in real-time.

---

## 🚀 Features

- Secure score updates using JWT authentication.
- DynamoDB-backed leaderboard.
- WebSocket-based live scoreboard updates.
- Built with Node.js and Express.js.

---

## 🛠️ Tech Stack

- **Node.js + Express.js** - Backend server.
- **DynamoDB** - NoSQL database for storing user scores.
- **WebSocket** - Real-time communication with clients.
- **JWT** - Authentication mechanism for securing API requests.

---

## 📌 API Specification

### Endpoint: `POST /api/score` 

#### Description
Create a user’s score after a successful action and triggers a real-time leaderboard update to all connected clients.

#### Headers
| Header Name     | Value             | Required |
|------------------|--------------------|----------|
| `Authorization` | Bearer `<token>` | ✅ Yes     |
| `Content-Type`  | `application/json` | ✅ Yes     |

#### Body

| Attribute       | Type     | Notes                            |
|-----------------|----------|----------------------------------|
| `score`         | Number   | Updated on each valid action     |

### Endpoint: `PATCH /api/score` same flow with `POST /api/score` but with updating score only
---

## 📊 Database Schema (DynamoDB)

| Attribute       | Type     | Notes                            |
|-----------------|----------|----------------------------------|
| `user_id`       | String   | Primary Partition Key            |
| `score`         | Number   | Updated on each valid action     |
| `updated_at`    | ISODate  | Optional: for tracking recency   |

To support top 10 queries efficiently, consider using a **Global Secondary Index (GSI)** with `score` as the sort key.

---

## 📡 WebSocket Flow

- When scores are updated, the server will emit a `leaderboard:update` message.
- All connected clients should listen for this message to refresh the leaderboard.

---

## 🔒 Security Measures

- JWT tokens required for every score update.
- Middleware verifies and decodes JWT to extract `user_id`.
- Only authenticated users can update scores for themselves.

---

## 🧪 Example Flow

1. Client completes a valid action.
2. Frontend sends a `POST /api/score` request with a JWT.
3. Backend authenticates the request and increments the user’s score in DynamoDB.
4. Server fetches top 10 scores.
5. Server emits `leaderboard:update` via WebSocket to all connected clients.

---

## 💡 Suggested Improvements

- Add **rate limiting** to prevent users from abusing the API with too many valid actions in a short time.
- Implement **action verification** (e.g., proof of action, or server-side validation).
- Consider using **Kinesis Data Streams** for buffering high-frequency updates (if required).
- Add **unit and integration tests** for update endpoint and WebSocket notifications.

---
