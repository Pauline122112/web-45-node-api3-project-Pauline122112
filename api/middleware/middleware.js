const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log('this is happening')
  console.log("it is a ${req.method} request!")
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params
  Users.getById(id)
  .then(possibleUser => {
    if (possibleUser) {
      req.users = possibleUser
      next()
    } else {
      next({ message: "user not found" });
    }
  })
}

async function validateUser(req, res, next) {
  try {
    const {users } = req.params
    const possibleUser = await Users.update(users)
    if (possibleUser) {
      req.users = possibleUser
      next()
    } else {
      next({message: "missing required name field"})
    }
  } catch (err) {
    next(err)
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = { 
  logger, 
  validateUserId, 
  validateUser 
}