# API Testing Guide

This guide shows you how to test the API endpoints using cURL or Postman.

## Base URL

**Local:** `http://localhost:5000/api`
**Production:** `https://your-backend.vercel.app/api`

## Authentication Endpoints

### 1. Register a New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "_id": "64abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "_id": "64abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "",
  "profileImage": "",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Get Current User

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "_id": "64abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "",
  "profileImage": ""
}
```

## Post Endpoints

**Note:** All post endpoints require authentication. Include the token in the Authorization header.

### 4. Get All Posts

```bash
curl -X GET http://localhost:5000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
[
  {
    "_id": "64abc456...",
    "user": {
      "_id": "64abc123...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "content": "Hello World! This is my first post.",
    "image": "",
    "likes": [],
    "comments": [],
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
]
```

### 5. Create a Post

```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is my first post!",
    "image": "https://example.com/image.jpg"
  }'
```

**Response:**
```json
{
  "_id": "64abc789...",
  "user": {
    "_id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "content": "This is my first post!",
  "image": "https://example.com/image.jpg",
  "likes": [],
  "comments": [],
  "createdAt": "2024-01-01T12:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

### 6. Get Single Post

```bash
curl -X GET http://localhost:5000/api/posts/POST_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 7. Update a Post

```bash
curl -X PUT http://localhost:5000/api/posts/POST_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Updated post content",
    "image": "https://example.com/new-image.jpg"
  }'
```

### 8. Delete a Post

```bash
curl -X DELETE http://localhost:5000/api/posts/POST_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "message": "Post removed"
}
```

### 9. Like a Post

```bash
curl -X PUT http://localhost:5000/api/posts/POST_ID_HERE/like \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 10. Unlike a Post

```bash
curl -X PUT http://localhost:5000/api/posts/POST_ID_HERE/unlike \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 11. Add a Comment

```bash
curl -X POST http://localhost:5000/api/posts/POST_ID_HERE/comments \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Great post!"
  }'
```

**Response:**
```json
{
  "_id": "64abc789...",
  "user": {
    "_id": "64abc123...",
    "name": "John Doe"
  },
  "content": "This is my post",
  "comments": [
    {
      "_id": "64abc999...",
      "user": {
        "_id": "64abc123...",
        "name": "John Doe"
      },
      "text": "Great post!",
      "createdAt": "2024-01-01T12:05:00.000Z"
    }
  ],
  "likes": [],
  "createdAt": "2024-01-01T12:00:00.000Z",
  "updatedAt": "2024-01-01T12:05:00.000Z"
}
```

### 12. Delete a Comment

```bash
curl -X DELETE http://localhost:5000/api/posts/POST_ID_HERE/comments/COMMENT_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## User Endpoints

### 13. Get User Profile

```bash
curl -X GET http://localhost:5000/api/users/USER_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "_id": "64abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "Software Developer",
  "profileImage": "https://example.com/profile.jpg",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T11:00:00.000Z"
}
```

### 14. Update User Profile

```bash
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "bio": "Full Stack Developer",
    "profileImage": "https://example.com/new-profile.jpg"
  }'
```

**Response:**
```json
{
  "_id": "64abc123...",
  "name": "John Smith",
  "email": "john@example.com",
  "bio": "Full Stack Developer",
  "profileImage": "https://example.com/new-profile.jpg"
}
```

## Testing with Postman

1. **Import the API**
   - Create a new collection in Postman
   - Add the base URL as a variable

2. **Set up Authorization**
   - After login/register, copy the token
   - Go to Authorization tab
   - Select "Bearer Token"
   - Paste your token

3. **Create Requests**
   - Add requests for each endpoint
   - Use the examples above
   - Save responses for reference

## Testing Workflow

1. **Register a new user** → Get token
2. **Login with user** → Verify token
3. **Create a post** → Get post ID
4. **Get all posts** → Verify post appears
5. **Like the post** → Verify like count
6. **Add a comment** → Verify comment appears
7. **Edit the post** → Verify changes
8. **Delete the post** → Verify removal
9. **Get user profile** → Verify data
10. **Update profile** → Verify changes

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid user data",
  "errors": [
    {
      "msg": "Please add a valid email",
      "param": "email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 404 Not Found
```json
{
  "message": "Post not found"
}
```

### 500 Server Error
```json
{
  "message": "Something went wrong!",
  "error": "Error details..."
}
```

## Environment Variables

Remember to set these before testing:

```env
# Backend
PORT=5000
MONGODB_URI=mongodb://localhost:27017/linkedin-clone
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## Tips

1. **Save your token** - You'll need it for most endpoints
2. **Use environment variables** in Postman for easy switching between local/production
3. **Test error cases** - Try invalid data, missing tokens, etc.
4. **Check response status codes** - 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), etc.
5. **Verify database** - Check MongoDB to see if data is actually saved

## Quick Test Script

Here's a bash script to quickly test all endpoints:

```bash
#!/bin/bash

# Set your base URL
BASE_URL="http://localhost:5000/api"

# Register
echo "1. Registering user..."
RESPONSE=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}')
TOKEN=$(echo $RESPONSE | jq -r '.token')
echo "Token: $TOKEN"

# Create Post
echo "2. Creating post..."
POST_RESPONSE=$(curl -s -X POST $BASE_URL/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"Test post"}')
POST_ID=$(echo $POST_RESPONSE | jq -r '._id')
echo "Post ID: $POST_ID"

# Get Posts
echo "3. Getting all posts..."
curl -s -X GET $BASE_URL/posts \
  -H "Authorization: Bearer $TOKEN" | jq

# Like Post
echo "4. Liking post..."
curl -s -X PUT $BASE_URL/posts/$POST_ID/like \
  -H "Authorization: Bearer $TOKEN" | jq

echo "Test complete!"
```

Save as `test-api.sh`, make executable with `chmod +x test-api.sh`, and run with `./test-api.sh`.

---

Happy Testing! 🚀
