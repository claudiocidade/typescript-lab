const readFromTextInput = (): string => {
  // pseudocode
  return "abcde "
}
const readFromNumberInput = (): number => {
  // pseudocode
  return 13
}
const addSignature = (input: string): string => {
  return input + '\n\nHello AI.';
};
const fitInSMS = (input: string, limit: number = 160): boolean => {
  return input.length <= limit;
};

/**
 * This method creates a pipe composition and the
 * resulting object is yet tighly coupled to the 
 * length limit scenario required when validating
 * whether or not a message fits in a SMS message.
 * It requires further enhancement for accepting
 * generic parameters, and being able to provide
 * different results other than boolean.
 * 
 * @param fns The fuctions composing the pipeline 
 * of processing applied to the input parameters,
 * applied from left to right.
 * e.g: compose(fn1, fn2, fn3, ..., fnn)
 * @return Whether or not the pipeline is valid or
 * not, assuming the specific scenario in which the 
 * very last function is a pipeline validation method.
 */
const compose = (...fns:Array<(ai:string, al?:number) => string | boolean>):any => {
  return (...initialArgs:any):boolean => {
    return fns.reduce((prev, next, i, source) => {
      return i === source.length - 1 && initialArgs[1] !== undefined ? 
        next(prev, initialArgs[1]) :
        next(prev);
    }, initialArgs);
  }
};

// ## 1.1. Success case
// ## TS Transpiler should understand the return type of compose function
const canSMS = compose(readFromTextInput, addSignature, fitInSMS);
// const canSMS = compose(readFromNumberInput, addSignature, fitInSMS);

const result = canSMS("Some SMS message used for tests");
// ## 1.2. Fail case
// ## TS Transpiler should validate types of parameters passed 
// ## from one function to another, e.g. This scenario should fail, 
// ## because readFromNumberInput returns a number, however 
// ## addSignature accepts string.
// const result = canSMS("Some SMS message used for tests", 16);

console.log(result);