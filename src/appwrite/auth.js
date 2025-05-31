import conf from '../config/conf.js'
import { Client, Account, ID } from 'appwrite'


export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }

    async createUser({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                this.login({email, password})
            }else{
                userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email, password}){
        try {
            await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
        
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("cannot get user", error)
        }

        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions( )
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()

export default authService