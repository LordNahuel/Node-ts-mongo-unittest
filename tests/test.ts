import chai from "chai"; 
import chaiHttp from "chai-http"; 
import server from "../src/app"; 

// Assertion Style 
chai.should(); 

chai.use(chaiHttp); 

describe("User API", () => {
    
    /**
     * Get All users
     */

    describe("user get all", () => {
        it("It should get all users", () => {
            chai.request(server)
                .get("/auth/profile/getAll")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
            })
        })
    })

    /**
     * Other test method
     */
})

//https://www.youtube.com/watch?v=I4BZQr-5mBY