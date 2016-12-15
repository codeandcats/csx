import { rgb, important, quote, url } from '../index';
import * as assert from 'assert';

describe("csx/important", () => {
    it("converts numbers to ${number} !important", () => {
        const numberToString = important(42);
        assert.equal(numberToString, '42 !important');
    });

    it("converts strings to ${string} !important", () => {
        const str = important('red');
        assert.equal(str, 'red !important');
    });

    it("converts helpers to string", () => {
        const importantColor = important(rgb(255, 0, 0));
        assert.equal(importantColor, 'rgb(255,0,0) !important');
    });
});

describe("csx/quote", () => {
    it("quotes ' correctly", () => {
        const contraction = quote("it's is a contraction");
        assert.equal(contraction, "'it\\'s is a contraction'");
    });

    it("quotes \" correctly", () => {
        const title = quote('A title "Should be in Quotes"');
        assert.equal(title, "'A title \"Should be in Quotes\"'");
    });
    
    it("quotes around the string", () => {
        const title = quote(`Hello, World!`);
        assert.equal(title, "'Hello, World!'");
    });
});

describe("csx/url", () => {
    it("converts a string to url(string)", () => {
        const urlString = url('http://somewhere');
        assert.equal(urlString, 'url(http://somewhere)');
    });
});