import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent implements OnInit {
  mainDisplay = '';
  subDisplay = '';
  op1 = '';
  op2 = '';
  operator = '';
  answer = '';
  inputHistory = [];
  operators:ReadonlyArray<string> = ['+', '-', '*', '/'];

  constructor() {

   }
  
  ngOnInit(): void {
  }

  /***HANDLE ROMAN NUMERAL INPUTS***/
  public numberInput(input:string){
    let previousInput = this.inputHistory[this.inputHistory.length-1];
    if(this.mainDisplay === 'ERROR')
      this.allClear();
    if(this.operators.includes(previousInput) || previousInput === '='){
      this.mainDisplay = input;
    }
    else{
      this.mainDisplay += input;
    }
    this.inputHistory.push(input);
  }

  /***HANDLE OPERATOR AND EQUAL SIGN INPUTS***/
  public operatorInput(input:string){
    let previousInput = this.inputHistory[this.inputHistory.length-1];
    //no input or two operator inputs in a row
    if(this.mainDisplay === '' || this.operators.includes(previousInput)){
      return;
    }
    //Reset calculator if error and user tries to input key
    if(this.mainDisplay === 'ERROR')
      this.allClear();
    //handle 2nd operand and (continuous) solutions
    else if((this.op1 != '' && this.operator != '')){
      if(previousInput === '='){//equal sign used to calculate expression
        this.operator = input;
        this.subDisplay = this.intToRoman(parseInt(this.answer)) + input;
      }
      else{
        this.op2 = this.mainDisplay;
        this.subDisplay += this.op2 + input;
        this.answer = this.solveEquation(this.op1, this.op2, this.operator);
        this.mainDisplay = parseInt(this.answer) > 0? this.intToRoman(parseInt(this.answer))  + ' (' + this.answer + ')' : 'ERROR';
        this.op1 = this.intToRoman(parseInt(this.answer));

        if(this.operators.includes(input))//operand used to calculate expression
          this.operator = input;
      }
    }
    //handle 1st operand and operator
    else if(this.op1 === '' && this.operator === ''){
      this.op1 = this.mainDisplay;
      this.operator = input;
      this.subDisplay += this.op1;
      this.subDisplay += this.operator;
    }
    this.inputHistory.push(input);
  }

  /***SOLVE THE EXPRESSION***/
  public solveEquation(num1, num2, operatorSymbol):string{
    return eval(this.romanToInt(num1) + operatorSymbol + this.romanToInt(num2)); 
  }

  /***CLEAR ONE STEP BACK***/
  public clear(){

  }

  /***CLEAR EVERYTHING***/
  public allClear(){
    this.mainDisplay = '';
    this.subDisplay = '';
    this.op1 = '';
    this.op2 = '';
    this.operator = '';
    this.answer = '';
    this.inputHistory = [];
  }
  
  /***CONVERT ROMAN NUMERALS TO INTEGER***/
  public romanToInt(num:string):string{
    let numValue = 0;
    let previousNum = '';
    for(let i = 0; i < num.length; i++){
      switch(num[i]){
        case 'I':
          numValue += 1;
          break;
        case 'V':
          numValue += previousNum === 'I'? 3:5;
          break;
        case 'X':
          numValue += previousNum === 'I'? 9:10;
          break;
        case 'L':
          numValue += previousNum === 'X'? 40:50;
          break;
        case 'C':
          numValue += previousNum === 'X'? 90:100;
          break;
        case 'D':
          numValue += previousNum === 'C'? 400:500;
          break;
        case 'M':
          numValue += previousNum === 'C'? 900:1000;
          break;
      }
      previousNum = num[i];
    }
    return numValue.toString();
  }

  /***CONVERT INTEGERS TO ROMAN NUMERAL***/
  public intToRoman(number:number):string{
    let romanNumeral = '';
    while(number > 0){
      while(number >= 1000){
        number -= 1000;
        romanNumeral += 'M';
      }
      if(number >= 900){
        number -= 900;
        romanNumeral += 'CM';
      }
      if(number >=500){
        number -= 500;
        romanNumeral += 'D';
      }
      if(number >= 400){
        number -= 400;
        romanNumeral += 'CD';
      }
      while(number >= 100){
        number -= 100;
        romanNumeral += 'C';
      }
      if(number >= 90){
        number -= 90;
        romanNumeral += 'XC';
      }
      if(number >= 50){
        number -= 50;
        romanNumeral += 'L';
      }
      if(number >= 40){
        number -= 40;
        romanNumeral += 'XL';
      }
      while(number >= 10){
        number -= 10;
        romanNumeral += 'X';
      }
      if(number >= 9){
        number -= 9;
        romanNumeral += 'IX';
      }
      if(number >= 5){
        number -= 5;
        romanNumeral += 'V';
      }
      if(number >= 4){
        number -= 4;
        romanNumeral += 'IV';
      }
      while(number >=1){
        number -= 1;
        romanNumeral += 'I';
      }
    }
    return romanNumeral;
  }
}
