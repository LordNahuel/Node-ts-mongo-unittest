import chai from "chai"; 
import chaiHttp from "chai-http"; 
import server from "../src/app"; 

// Assertion Style 
chai.should(); 

chai.use(chaiHttp); 

describe("User get API", () => {
    /**
     * Test the GET route 
     */
    it("It should get all users", (done) => {
        chai.request(server)
            .get("/auth/profile/getAll")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                //response.body.lenght.should.be.eq(3);
            done()
            }); 
    })

     
    /**
     * Test GET by ID
     */
})

//https://www.youtube.com/watch?v=I4BZQr-5mBY