const firebase = require("@/services/firebase");
const { createUser, findUserById } = require("@/app/users/repository");

function parseAuthToken(authHeader) {
  if (!authHeader) return null;
  const [prefix, token] = authHeader.split(" ");
  return prefix === "Bearer" ? token : null;
}

async function attachUser(req, res, next) {
  try {
    const token = parseAuthToken(req.get("authorization"));
    if (!token) return next();
    const decoded = await firebase.auth().verifyIdToken(token);
    req.user = await findUserById(decoded.uid);

    // we automatically create a new user if user is authenticated with firebase but there is no user found in mongo
    if (!req.user) {
      req.user = await createUser({
        _id: decoded.uid,
        email: decoded.email,
      });
    }

    next();
  } catch (err) {
    next();
  }
}

function requireUser(req, res, next) {
  if (!req.user) return res.unauthorized();
  next();
}

//* No AWS Lambda needed
// function authenticateLambda(req, res, next) {
//   if (IS_EBS_WORKER) return next();

//   try {
//     const token = req.get("x-lambda-auth-token");
//     if (!token || token !== AWS_LAMBDA_AUTH_SECRET) {
//       throw new Error("Invalid token");
//     }
//     next();
//   } catch (e) {
//     res.unauthorized();
//   }
// }

module.exports = {
  attachUser,
  authenticateUser: [attachUser, requireUser],
};
