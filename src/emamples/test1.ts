// https://stackoverflow.com/questions/56505560/how-to-fix-ts2322-could-be-instantiated-with-a-different-subtype-of-constraint
// 'string' is assignable to the constraint of type 'T',
// but 'T' could be instantiated with a different subtype of constraint 'string | string[]'
// const func1 = <A extends string>(a: A = 'foo') => `hello!`;
