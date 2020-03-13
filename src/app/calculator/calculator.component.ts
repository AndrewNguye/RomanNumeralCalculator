import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR, IfStmt } from '@angular/compiler/src/output/output_ast';

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
  operators:ReadonlyArray<string> = ['+', '-', '*', '/', '='];

  constructor() {
   }
  
  ngOnInit(): void {
  }

  /***HANDLE INPUTS***/
  public inputKey(input:string){
    let previousInput = this.inputHistory[this.inputHistory.length -1];

    if(!this.operators.includes(input) && this.operator === ''){//HANDLE OPERATOR1 INPUT
      if(previousInput === '='){//if equation is solved and a new number is input clear the calculator and start new equation
        this.allClear();
        this.mainDisplay = input;
      }
      else
        this.mainDisplay += input;
      this.op1 += input;
      this.inputHistory.push(input);
      console.log('OP1 = ' + this.op1 + ' OPERATOR = ' + this.operator + ' OP2 = ' + this.op2);
      return;
    }

    if(this.operators.includes(input) && this.operator === '' && this.mainDisplay != ''){//HANDLE OPERATOR INPUT
      if(input === '=')
        return;
      this.operator = input;
      if(previousInput === '=')
        this.subDisplay = this.intToRoman(parseInt(this.answer)) + input;
      else
        this.subDisplay += this.op1 + input;
      this.inputHistory.push(input);
      console.log('OP1 = ' + this.op1 + ' OPERATOR = ' + this.operator + ' OP2 = ' + this.op2);
      return;
    }

    if(!this.operators.includes(input) && this.operator != ''){//HANDLE OPERATOR2 INPUT
      if(this.op2 === '')
        this.mainDisplay = input;
      else
        this.mainDisplay += input;
      this.op2 += input;
      this.inputHistory.push(input);
      console.log('OP1 = ' + this.op1 + ' OPERATOR = ' + this.operator + ' OP2 = ' + this.op2);
      return;
    }

    if(this.operators.includes(input) && this.operator != '' && this.op2 != ''){//PRODUCE ANSWER
      this.answer = this.solveEquation(this.op1, this.op2, this.operator);
      if(input === '='){
        this.operator = '';
      }
      else{
        this.operator = input;
      }
      this.subDisplay += this.op2 + input;
      this.mainDisplay = parseInt(this.answer) > 0? this.intToRoman(parseInt(this.answer)) + ' (' + parseInt(this.answer) + ')'
      :'ERROR ANSWER MUST BE A NATURAL NUMBER';
      this.op1 = this.intToRoman(parseInt(this.answer));
      this.op2 = '';
      this.inputHistory.push(input);
      console.log('OP1 = ' + this.op1 + ' OPERATOR = ' + this.operator + ' OP2 = ' + this.op2);
      return;
    }
  }

  /***SOLVE THE EXPRESSION***/
  public solveEquation(num1, num2, operatorSymbol):string{
    return eval(this.romanToInt(num1) + operatorSymbol + this.romanToInt(num2)); 
  }

  /***CLEAR ONE STEP BACK***/
  public clear(){
    let previousInput = this.inputHistory[this.inputHistory.length -1];
    if((this.op1 != '' || this.operator === '') && this.op2 === '' || previousInput === '='){
      this.allClear();
      return;
    }

    if(this.op1 != '' && this.operator != '' && this.op2 != ''){
      this.op2 = '';
      this.mainDisplay = '';
      let indexOfOperator = this.inputHistory.indexOf(this.operator) + 1;
      this.inputHistory.splice(indexOfOperator);//delete input history that occured after the operator
    }
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
          numValue += previousNum === 'I'? 8:10;
          break;
        case 'L':
          numValue += previousNum === 'X'? 30:50;
          break;
        case 'C':
          numValue += previousNum === 'X'? 80:100;
          break;
        case 'D':
          numValue += previousNum === 'C'? 300:500;
          break;
        case 'M':
          numValue += previousNum === 'C'? 800:1000;
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
