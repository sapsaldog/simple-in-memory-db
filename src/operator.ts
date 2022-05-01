import * as _ from "lodash";

type Value = number;

let Memory: { [key: string]: Value } = {};
let CountMemory: { [key: Value]: number } = {};

let TransactionStack: {
  Memory: { [key: string]: Value };
  CountMemory: { [key: Value]: number };
}[] = [];

let print = console.log;

const reset = () => {
    Memory = {};
    CountMemory = {}
    TransactionStack = [];
    print = console.log;
}

const set = (key: string, val: Value) => {
  const oldVal = Memory[key];

  if (oldVal) {
    CountMemory[oldVal]--;
  }

  Memory[key] = val;

  if (!CountMemory[val]) CountMemory[val] = 0;
  CountMemory[val]++;
};

const get = (key: string) => {
  if (Memory[key]) print(Memory[key]);
  else print("NULL");
};

const unset = (key: string) => {
  const val = Memory[key];
  if (val) {
    delete Memory[key];
    CountMemory[val]--;
  }
};

const numEqualTo = (val: Value) => {
  print(CountMemory[val] ? CountMemory[val] : 0);
};

const transactionBegin = () => {
  TransactionStack.push(_.cloneDeep({ Memory, CountMemory }));
};

const transactionCommit = () => {
  if (TransactionStack.length > 0) {
    while (TransactionStack.length > 0) TransactionStack.pop();
  } else {
    print("NO TRANSACTION");
  }
};

const transactionRollback = () => {
  if (TransactionStack.length > 0) {
    const top = TransactionStack.pop();
    Memory = top.Memory;
    CountMemory = top.CountMemory;
  } else {
    print("NO TRANSACTION");
  }
};

const setOutputHanlder = (handler: (output: string) => void ) => {
    print = handler;
}

export default {
    reset, get, set, unset, numEqualTo, transactionBegin, transactionCommit, transactionRollback, setOutputHanlder
}