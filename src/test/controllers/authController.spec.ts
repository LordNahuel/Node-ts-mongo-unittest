import assert from "assert"; 
import { isAuthorized, isAuthorizedAsync, setRoles } from "../../controllers/auth.controller";

describe("AuthController", function() {
    beforeEach(function() {
        console.log("runing before each");
        setRoles(['user']);
    });  

    describe("isAuthorized", function() {
        it("Should return false if not authorized", function() {
            assert.equal(false, isAuthorized('admin'));
        })

        it("Should return true if is authorized", function() {
            setRoles(['user', 'admin']);
            assert.equal(true, isAuthorized('admin'));
        })
    })

    describe("isAuthorizedAsync", function() {
        it("Should return false if not authorizedAsync", function(done) {
            this.timeout(2500); 
            isAuthorizedAsync('admin', function(isAuth: Boolean) {
                assert.equal(false, isAuth);
                done();
            });
        })

        it("Should return true if is authorizedAsync", function(done) {
            this.timeout(2500); 
            setRoles(['user', 'admin']);
            isAuthorizedAsync('admin', function(isAuth: Boolean){
                assert.equal(true, isAuth);
                done();
            });
        })
    })
})  
