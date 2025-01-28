 HomeWork 1
- create a repository
- intialize the repository
- node_modules, package.json, package-lock.json
- install express
- listen to port 7777
- write request handlers for /test , /hello
- install nodemon and update scripts inside package.json
- diff between carrot and tilde
- what are the dependencies
- use of -g

 Homework 2
- intialize git
- .gitignore
- create a remote repo on github
- Push all code to remote origin
- Play with routes and route extension eg /hello , /hello2 etc
- **order of the routes matter**
- Install Postman app and make a workspace/collection > test API call
- Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on POSTMAN
- Explore routing and use of ? , + , (), * in the routes
- use of regex in routes /a/, /.*fly$/
- Reading the query params in the routes 
- Reading the dynamic routes

 HomeWork3
- multiple route handlers and play with the code
- next() function
- next function and errors along with res.send()
- app.use("/route" , rH, [rH2, rH31, rH4, rH5]);
- What is a middleware
- How express JS basically handles requests behind the scenes
- Difference between app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes , except /user/login  
- error handling using app.use("/",(err,req,res,next)=>{})

HomeWork 4
- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose Library
- Connect Your application to the Database "Connection-url"/devTinder
- call the connectDB function and connect to database before starting application on 7777
- create a userSchema and userModel
- Create /signup API to add to database
- Push some documents using API calls from POSTMAN
- Error handling using try , catch

HomeWork 5
- difference between JSON and JavaScript
- Add the express.json() middleware to your app
- make your signup API dynamic to recieve data from the end user
- API - Get user by email
- API - Feed API - GET/feed - get all the users from the database
- API get user by id
- API - Update a user data 
- Explore mongoose documentation specially models
- what are options in a model.findOneAndUpdate ,  explore more about it 
- API - Update the user with emailID

HomeWork 6
- Explore schematype options from the documentation
-add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Add timestamps to the userSchema
- Add API level validation on Patch request & Signup post api
- DATA Sanatization -  Add API validation for each field
- Install Validator 
- Explore Validator functions, library and use validator functions for password , email, URL
- NEVER TRUST req.body

HomeWork7
- validate data in signup API (validator function)
- Install bcrypt package
- Create Passwordhash using bcrypt.hash & save the user is encrypted password

- Create Login API
- Compare passwords and throw errors if email or password is invalid

- install cookie-parser
- just send a dummy cookie to user
- create GET/profile API and check if you get the cookie back
- In login API , after email and password validation, create a JWT token and send it back to user
- read the cookie inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middleware in profile API ans a new sendConnectionRequest API
- set the expiry of JWT token and cookie to the 7 days after
- Create userSchema method to getJWT()
- Create UserSchema method to comparepassword(passwordInputByUser) 

HomeWork 8
- Explore tinder APIs
- Create a list of all APIS of DevTinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing auth, profile, request routers
- Import these routers in app.js
- Create POST/logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forget Password API 
- Make sure you validate all data in every POST , PATCH apis

HomeWork 9
- Create Connection requestSchema 
- Send Connection Request API
- Proper Validation of Data
- Think about All Corner cases
- $or query $and query in mongoose request 
- Schema.pre("save") function
- Read more about indexes 
- Why do we need indexes
- What is the advantages and disadvantages of indexes
- Read article about compound Indexes
- ALWAYS THINK ABOUT CORNER CASES

HomeWork 10
- Write code with proper validation /request/review/:status/:requestId
- Read about ref and populate in mongoose
- Create GET /user/requests/received with all the checks
- Create GET  /user/connections

HomeWork 11
- Logic for GET /feed API
- Explore the $nin , $ne , $and and other query operators

- Pagination

/feed?page=1&Limit=10 => 1-10 (.skip(0) .limit(10))

/feed?page=2&Limit=10 => 11-20 (.skip(10) .limit(10))

/feed?page=3&Limit=10 => 21-30 (.skip(20) .limit(10))

.skip() & .limit() -> MongoDB function

eg .skip(0) .limit(10) -> five first 10 User
 .skip(10) .limit(10) -> next 10 User

 skip = (page - 1) * limit