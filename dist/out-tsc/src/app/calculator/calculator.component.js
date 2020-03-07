import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CalculatorComponent = class CalculatorComponent {
    constructor() {
        this.mainDisplay = '';
        this.subDisplay = '';
        this.op1 = '';
        this.op2 = '';
        this.inputHistory = [];
        this.operators = ['+', '-', '*', '/'];
    }
    ngOnInit() {
    }
    numberInput(input) {
        let previousInput = this.inputHistory[this.inputHistory.length - 1];
        if (this.operators.includes(previousInput) || previousInput === '=') {
            this.mainDisplay = input;
        }
        else {
            this.mainDisplay += input;
        }
        this.inputHistory.push(input);
    }
    operatorInput(input) {
        let previousInput = this.inputHistory[this.inputHistory.length - 1];
        if (this.mainDisplay === '' || this.operators.includes(previousInput)) { //ignore button press if the current display is empty or the operator was already added
            return;
        }
        //if operand1 and the operator are chosen
        if (this.op1 != '' && this.operator != '') {
            this.op2 = this.mainDisplay;
            this.subDisplay += this.op2 + input;
            let answer = this.solveEquation(this.op1, this.op2, this.operator);
            this.mainDisplay = this.intToRoman(parseInt(answer)) + '(' + answer + ')';
            this.op1 = answer;
            this.op2 = ''; //reset the 2nd operand
            if (this.operators.includes(input))
                this.operator = input;
            else
                this.operator = '';
        }
        else if (this.op1 === '') { //if operand1 is the only thing selected
            this.op1 = this.mainDisplay;
            this.operator = input;
            this.subDisplay += this.op1;
            this.subDisplay += this.operator;
        }
        this.inputHistory.push(input);
    }
    solveEquation(num1, num2, operatorSymbol) {
        return eval(this.romanToInt(num1) + operatorSymbol + this.romanToInt(num2));
    }
    clear() {
    }
    allClear() {
    }
    //I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000
    romanToInt(num) {
        let numValue = 0;
        let previousNum = '';
        for (let i = 0; i < num.length; i++) {
            switch (num[i]) {
                case 'I':
                    numValue += 1;
                    break;
                case 'V':
                    numValue += previousNum === 'I' ? 3 : 5;
                    break;
                case 'X':
                    numValue += previousNum === 'I' ? 9 : 10;
                    break;
                case 'L':
                    numValue += previousNum === 'X' ? 40 : 50;
                    break;
                case 'C':
                    numValue += previousNum === 'X' ? 90 : 100;
                    break;
                case 'D':
                    numValue += previousNum === 'C' ? 400 : 500;
                    break;
                case 'M':
                    numValue += previousNum === 'C' ? 900 : 1000;
                    break;
            }
            previousNum = num[i];
        }
        return numValue.toString();
    }
    intToRoman(number) {
        let romanNumeral = '';
        while (number > 0) {
            if (number >= 1000) {
                number -= 1000;
                romanNumeral += 'M';
            }
            if (number >= 900) {
                number -= 900;
                romanNumeral += 'CM';
            }
            if (number >= 500) {
                number -= 500;
                romanNumeral += 'D';
            }
            if (number >= 400) {
                number -= 400;
                romanNumeral += 'CD';
            }
            if (number >= 100) {
                number -= 100;
                romanNumeral += 'C';
            }
            if (number >= 90) {
                number -= 90;
                romanNumeral += 'XC';
            }
            if (number >= 50) {
                number -= 50;
                romanNumeral += 'L';
            }
            if (number >= 40) {
                number -= 40;
                romanNumeral += 'XL';
            }
            if (number >= 10) {
                number -= 10;
                romanNumeral += 'X';
            }
            if (number >= 9) {
                number -= 9;
                romanNumeral += 'IX';
            }
            if (number >= 5) {
                number -= 5;
                romanNumeral += 'V';
            }
            if (number >= 4) {
                number -= 4;
                romanNumeral += 'IV';
            }
            if (number >= 1) {
                number -= 1;
                romanNumeral += 'I';
            }
        }
        return romanNumeral;
    }
};
CalculatorComponent = __decorate([
    Component({
        selector: 'app-calculator',
        templateUrl: './calculator.component.html',
        styleUrls: ['./calculator.component.css']
    })
], CalculatorComponent);
export { CalculatorComponent };
//# sourceMappingURL=calculator.component.js.map