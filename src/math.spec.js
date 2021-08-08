import { isEven } from './math';

describe("isEven", ()=>{
    it("should return true if given a even number", ()=>{
        //function under test or system under test (SUT)
        const result = isEven(2);
        expect(result).toEqual(true);
    });
    
    it("should return false if given an odd number", ()=>{
        //function under test or system under test (SUT)
        const result = isEven(1);
        expect(result).toEqual(false);
    });
})