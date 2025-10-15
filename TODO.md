# TODO List for Firebase Authentication Challenge

- [ ] Move getUserDetails from adminController to userController
- [ ] Add GET /:id route in userRoutes for user details with auth and authz
- [ ] Change admin route from /set-claims to /setCustomClaims
- [ ] Create src/errors/AuthenticationError.ts
- [ ] Create src/errors/AuthorizationError.ts
- [ ] Update authMiddleware to throw AuthenticationError
- [ ] Update authorize to throw AuthorizationError
- [ ] Update app.ts global error handler for custom errors
- [ ] Add Morgan logging to app.ts
- [ ] Update package.json for morgan and @types/morgan
- [ ] Run npm install
- [ ] Run npm start to test
