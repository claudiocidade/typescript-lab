import { Pipe, Compose } from "./types";

const readFromTextInput = (input: string): string => {
  // console.log(`readFromTextInput('${input}')`);
  // pseudocode
  return input;
}
const readFromNumberInput = (input: number = 15): number => {
  // console.log(`readFromNumberInput('${input}')`);
  // pseudocode
  return input;
}
const addSignature = (input: string): string => {
  const signature:string = input + '\nHello AI.';
  // console.log(`addSignature('${signature}')`);
  return signature;
};
const fitInSMS = (input: string, limit: number = 160): boolean => {
  let fits:boolean = input.length <= limit
  // console.log(`fitInSMS('${input}', ${limit}) : (${input.length} <= ${limit}) => ${fits}`);
  return fits;
};

/**
 * I have created a 'pipe' function for solviing the 
 * problem, mainly because the resolving function requires
 * a structure that is distinct from other functions 
 * composing the chain and, at the moment, typescript
 * doesn't support adding ...rest parameters anywhere 
 * else other than the last position (which is a limitation
 * shared by other languages such as C#). This is why I had 
 * to rearrange the invocation and use it as such. Should
 * the return type be the same as the chain (string) insteead 
 * of boolean, I would have been able to go with the initial
 * left-to-right solution (compose).
 * 
 * @param fn1 The function responsible for resolving
 * the entire pipeline of commands/functions whose
 * arity is different from those of the functions
 * composing the entire chain. 
 * @param fns The collection of functions invoked in a 
 * chain 
 * @return Whether or not the pipeline is valid or
 * not, assuming the specific scenario in which the 
 * very last function is a pipeline validation method.
 */
const pipe = <R, F>(
    fn1: (a: R) => F, 
    ...fns: Array<(a: R) => R>
  ) : (a: R) => F => 
    fns.reduce((prev, next) => 
      (value: R) => 
        prev(next(value)), 
          fn1);

const P: Pipe = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const C: Compose = (...fns) => x => fns.reduce((v, f) => f(v), x);

const test01 = pipe(fitInSMS, addSignature, readFromTextInput, /*readFromNumberInput*/);
// Right-to-left pipeline
const test02 = P(fitInSMS, addSignature, readFromTextInput);
// Left-to-right composition
const test03 = C(readFromTextInput, addSignature, fitInSMS);

console.log(test01("Some random SMS message used for tests"));
console.log(test02("Some random SMS message used for tests"));
console.log(test03("Some random SMS message used for tests"));