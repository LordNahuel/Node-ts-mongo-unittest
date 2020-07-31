import assert from "assert"; 
import { it } from "mocha";

describe("Basic mocha test", function() {
    it("should throw errors", function() {
        assert.equal(2,2);
    })
});