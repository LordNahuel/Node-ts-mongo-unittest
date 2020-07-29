import chai, { expect } from "chai"; 
// import chaiHttp from "chai-http";
import fetch from "node-fetch";  
import server from "../app"; 
import logger from "../common/logger";

// Assertion Style Chai Expect

/**
 * This methods verify the user actions. 
 */
describe('User methods', () => {
    /**
     * GET usercontroller getAll
     * response.status should be 200
     */
    it("Status Should be 200", async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/profile/getAll');
            expect(response.status).to.be.equal(200);
            const users = await response.json();
            expect(users).to.be.an('Array');
            expect(users.length).to.be.equal(1);    
        } catch (error) {
            logger.error("Error getting status response ", error);
            throw error; 
        }
    }) 
})

//https://www.youtube.com/watch?v=I4BZQr-5mBY