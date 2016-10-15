//Import the cache module we just created
const cache = require('./cache');

const ages = {
  John: '20',
  Michelle: '34',
  Amy: '31',
  Doug: '22'
}

const getAgeFromDb = (name, cb) => setTimeout(() => {
  console.log('Fetching from db')
  const age = ages[name] || 'Does not exist'
  cb(age)
}, 1000)

//We now export a new function, which makes use of the cache
module.exports = (name, cb) => {

  //First, check if the age exists in our cache
  cache.get(name, (err, age) => {
    if (age !== null) {
      //If it does, return it in the callback
      return cb(age)
    }

    /*
    At this point, we know that the data we want does not exist in the cache
    So, we query it from our mock database, like before
    */
    getAgeFromDb(name, age => {
      //Once we get the age from the database, store it in the cache.
      cache.set(name, age, () => {

        //At this point, our data is successfully stored in the redis cache
        // We now return the age through the callback
        cb(age)
      })
    })
  })
}
