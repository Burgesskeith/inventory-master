import bcrypt from 'bcrypt';

const users = [
    {
        name: "MR Admin",
        email: "prash@happy.com",
        password: bcrypt.hashSync("12345678", 10),
        isAdmin: true
    },
    {
        name: "Keith Burgess",
        email: "keith@webwings.com.au",
        password: bcrypt.hashSync("123456", 10)
    },
    {
        name: "Puranjay Singh",
        email: "puranjay@singh.com",
        password: bcrypt.hashSync("123456", 10)
    },
    {
        name: "Himanshu",
        email: "himanshu@delhi.com",
        password: bcrypt.hashSync("123456", 10)
    },
    {
        name: "Prash",
        email: "prash@bangalore.com",
        password: bcrypt.hashSync("123456", 10)
    }
];

export default users;