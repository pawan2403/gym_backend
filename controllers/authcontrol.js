const AuthService = require('../services/authservice');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Nodemailer = require('../utility/nodemailer')
const { v4: uuidv4 } = require('uuid');
const userId = uuidv4();

class AuthControl {
    constructor() {
        this.mailer = new Nodemailer()
        this.Auth = new AuthService();
        this.signUp = this.signUp.bind(this);
        // this.checkEmail = this.checkEmail.bind(this);
        this.signIn = this.signIn.bind(this);
        this.addUser = this.addUser.bind(this);
        this.UpdateUser = this.UpdateUser.bind(this);
        this.findById = this.findById.bind(this);
        this.fetchAllUser = this.fetchAllUser.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
        this.getUserCount = this.getUserCount.bind(this);
        this.getActiveUsersCount = this.getActiveUsersCount.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this);
        this.getCountUser = this.getCountUser.bind(this);
    }


    async signUp(req, res, next) {
        console.log("CHECK_FUNCTION")
        try {
            const data = req.body
            const result = await this.Auth.checkEmailExist(data.email)
            console.log('RESULT_EMAIL_CHECK', result)
            if (result.length <= 0) {
                const response = await this.Auth.signUp(data)
                console.log('resssss', response)
                if (response) {
                    //Nodemailer
                    // const details =  { email: response[0].email, password: response[0].password, fname: response[0].fname, lname: response[0].lname, id: response[0].id, status: response[0].status, role: response[0].role }
                    // const token = jwt.sign(details, process.env.ACCESS_TOKEN, { expiresIn: '24h' })
                    // await this.mailer.sendVerifyMail(data)
                    // console.log("signuptoken==>>", token)
                    res.status(200).send({
                        status: "SUCCESS",
                        Data: response
                    })
                }
                else {
                    res.status(400).send("something went wrong")
                }
            }
            else {
                res.status(409).send({
                    status: 'Dublicate',
                    msg: 'Email Already Exist'
                })
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async signIn(req, res, next) {
        try {
            const data = req.body
            console.log("DATA",data)
            const result = await this.Auth.signIn(data.email)
            console.log("RESULT_SIGNIN",result)
            if (result.length !== 0) {
                if (data.password == result[0].password) {
                    //jwt
                    const response = { email: result[0].email, password: result[0].password, name: result[0].name, contact: result[0].contact }
                    const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '24h' })
                    console.log("tokennnnnnnnn", accessToken)
                    let response_json = {
                        status: "SUCCESS",
                        token: accessToken
                    }
                    res.status(200).send(response_json)
                    // res.status(200).send({'token':accessToken})
                }
                else {
                    res.status(401).send({ msg: 'Invalid Password' })
                }
            }
            else {
                res.status(404).send({ msg: 'User Not Found' })
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async addUser(req, res, next) {
        console.log("Add User Api")
        try {
            const data = req.body
            const userBody = {
                userID: userId,
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                address: req.body.address,
                packages: req.body.package,
                status: req.body.status,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                created_at: new Date(),
                created_by: "pawan.call.ai@gmail.com",
                updated_at: null,
                modified_by: null
            };
            console.log("USER_BODY", userBody,req.body)
            // const email = req.params.email
            const result = await this.Auth.emailCheck(data.email)
            console.log('RESULT', result)
            if (result.length <= 0) {
                const response = await this.Auth.createUsers(userBody)
                console.log('RESPONSE', response)
                if (response) {
                    res.status(200).send({
                        status: "SUCCESS",
                        Data: response
                    })
                }
                else {
                    res.status(400).send("something went wrong")
                }
            }
            else {
                res.status(409).send({
                    status: 'Dublicate',
                    msg: 'Email Already Exist'
                })
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async fetchAllUser(req, res, next) {
        try {
            let data = req.body
            const response = await this.Auth.fetchUsers(data)
            // console.log("RESULT USER", response)
            res.status(200).send({
                status: "SUCCESS",
                Data: response
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async UpdateUser(req, res, next) {
        try {
            const id = req.params.id
            const data = req.body
            console.log('dataaaaaaaa-----===', data)
            const result = await this.Auth.updateUser(id, data)
            if (result) {
                res.status(200).send(result)
            }
            else {
                res.status(500).send('Something Went Wrong')
            }
        } catch (err) {
            throw err

        }
    }

    async deleteUser(req, res, next) {
        try {
            const email = req.params.email
            const result = await this.Auth.deleteUser(email)
            console.log('deleteUser_RESULT', result)
            if (result) {
                res.status(200).send({
                    status: "SUCCESS",
                    data: result
                })
            }
            else {
                res.status(502).send({
                    status: 'FAILED',
                    data: 'Something Went Wrong'
                })
            }
        } catch (err) {
            console.log('errrrrrrrrrrr', err)
            res.status(500).send(err)
        }
    }

    async filterUsers(req, res, next) {
        try {
            const userID = req.params.userId
            console.log("userID", userID)
            const result = await this.Auth.filterUsers(userID)
            console.log('RESULT', result)
            res.status(200).send({
                status: "SUCCESS",
                data: result
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async getUserCount(req, res) {
        try {
            const result = await this.Auth.getUserCount();
            res.status(200).send({
                status: "SUCCESS",
                data: result
            })
        }
        catch (error) {
            res.status(500).send(error)
        }
    }

    async getActiveUsersCount(req, res){
        try {
            const result = await this.Auth.getActiveUsersCount();
            console.log("ACTIVE_USERS_RESULT",result)
            res.status(200).send({
                status: "SUCCESS",
                data: result
            })
        }
        catch (error) {
            res.status(500).send(error)
        }
    }

    
    //Not in Used
    async findById(req, res, next) {
        try {
            const id = req.query.id
            const result = await this.Auth.findById(id)
            console.log('findById_RESULT', result)
            if (result) {
                res.status(200).send(result)
            }
            else {
                res.status(500).send('ID not found')
            }
        } catch (err) {
            throw err
        }
    }

    async getCountUser(req, res) {
        try {
            const result = await this.Auth.getUserCount();
            res.status(200).send({
                status: "SUCCESS",
                data: result
            })
        }
        catch (error) {
            res.status(500).send(error)
        }
    }

    async verifyEmail(req, res, next) {
        console.log("jjj=")
        try {
            // const data = req.body
            const email = req.body.email
            console.log("hhhhhhhhhhhh", email)
            const result = await this.Auth.checkEmail(email)
            console.log('vvvvvvvvvv', result)
            if (result.length > 0) {
                if (result[0].status == 'In Active') {

                    let data = {
                        status: 'Active'
                    }
                    const response = await this.Auth.updateUser(result[0].id, data)
                    console.log('resssss', response)
                    if (response) {
                        res.status(200).send({
                            status: "SUCCESS",
                            Data: response
                        })
                    }
                    else {
                        res.status(400).send({ msg: "something went wrong" })
                    }
                }
                else {
                    res.status(409).send({ msg: 'Email already Verified' })
                }
            }
            else {
                res.status(409).send({
                    status: 'FAILED',
                    msg: 'Email not Found'
                })
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }

    // async checkEmail(req, res, next) {
    //     console.log("print111111111111111111", req.params)
    //     try {
    //         const data = req.params.email
    //         const result = await this.Auth.checkEmail(data)
    //         if (result) {
    //             res.status(200).send(result)
    //         }
    //         else {
    //             res.status(500).send('something went wrong')
    //         }
    //     } catch (err) {
    //         throw err

    //     }
    // }


}

module.exports = AuthControl