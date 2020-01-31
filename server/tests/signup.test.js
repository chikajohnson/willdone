const app = require('../app');
const supertest = require('supertest');
const request = supertest(app)

const User = require('../db/models/user');
const { setupDB } = require('./init/dbsetup');

setupDB(process.env.DB_TEST, true)

it('Should signup a user', async done => {
    const res = await request.post('/signup')
        .send({
            firstName: "Jones",
            lastName: "Emeka",
            email: "chika@gmail.com",
            phoneNumber: "0898283832",
            dateOfBirth: "2009-12-12",
            placeOfBirth: "Ipaja",
            parish: "St Ferdinand, Boys Town",
            gender: "male",
            password: "!pass4sure",
            confirmPassword: "!pass4sure"
        })

    // Ensures response contains name and email
    expect(res.body.name).toBeTruthy()
    expect(res.body.email).toBeTruthy()

    // Searches the user in the database
    const user = await User.findOne({ email: 'chika@gmail.com' })
    expect(user.name).toBeTruthy();
    expect(user.email).toBeTruthy();
    
    done()
})