import chai, { expect } from "chai"; 
import chaiHttp from "chai-http"; 
import server from "../app"; 
import { hello } from '../controllers/user.controller';
import { doesNotMatch } from "assert";
import { error } from "winston";

// Assertion Style 
chai.should(); 

chai.use(chaiHttp);

/**
 * Test methods
 */
describe('First test methods', () => {
    it('should return Hello World!', () => {
        const result = hello(); 
        expect(result).equal("Hello World");
    })

    it("Status Should be 200", () => {
        chai.request(server)
            .get("/")
            .then((res) => {     
                expect(res).to.have.status(400);
            })
            .catch((err) => {
                throw error; 
            }) 
    })
})

//https://www.youtube.com/watch?v=I4BZQr-5mBY