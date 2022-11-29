const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 16;


const createUser = async (
    username, password
) => {
    if (!username ||
        !password) throw new Error('All fields need to have valid values');
    if (typeof username != 'string') throw new Error('error');

    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);

    const userCollection = await users();
    let newUser = {
        username: username,
        password: hash,
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not add User';
    const newId = insertInfo.insertedId.toString();
    const userID = getMovieById(newId);
    return userID;
};

const checkUser = async (username, password) => {
    try {
        if (!username ||
            !password) throw new Error('All fields need to have valid values');
        if (typeof username != 'string') throw new Error('error');

        const userCollection = await users();
        const userExist = await userCollection.findOne({ name: username });
        if (!userExist) return { msg: "Either the username or password is invalid" }
        const compare = await bcrypt.compare(password, userExist.password, saltRounds)
        if (compare) {
            return { authenticatedUser: true };
        } else {
            return { msg: "Either the username or password is invalid" }
        }

    } catch (e) {
        console.log(e)
    }
};

module.exports = {
    createUser,
    checkUser
};