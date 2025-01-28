# DevTinderAPIS

## authRouter (folder)
- POST/signup
- POST/login
- POST/logout

## ProfileRouter
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password // Forget Password API


## ConnectionRequestRouter
- POST/request/send/interested/:userId
- POST/request/send/ignored/:userId
- POST/request/send/:status/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId
- POST /request/review/status/:requestId


## userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform


Status : ignore, interested, accepted, rejected
