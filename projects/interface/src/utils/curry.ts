export const curry = <T, V, E>(func: (arg1: V, arg2: E) => T, arg1: V) => {
  return (arg2: E) => func(arg1, arg2);
};
