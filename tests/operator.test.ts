import operator from "../src/operator";

describe("function level test", () => {
  let outputBuffer = "";

  beforeEach(() => {
    outputBuffer = "";
    operator.reset();
    operator.setOutputHanlder((output: any) => {
      outputBuffer = output.toString();
    });
  });

  it("# sample 1", () => {
    operator.set("x", 10);
    operator.get("x");
    expect(outputBuffer).toEqual("10");
    operator.unset("x");
    operator.get("x");
    expect(outputBuffer).toEqual("NULL");
  });

  it("# sample 2", () => {
    operator.set("a", 10);
    operator.set("b", 10);
    operator.numEqualTo(10);
    expect(outputBuffer).toEqual("2");
    operator.numEqualTo(20);
    expect(outputBuffer).toEqual("0");
    operator.set("b", 30);
    operator.numEqualTo(10);
  });

  it("# sample 3", () => {
    operator.transactionBegin();
    operator.set("a", 10);
    operator.get("a");
    expect(outputBuffer).toEqual("10");
    operator.transactionBegin();
    operator.set("a", 20);
    operator.get("a");
    expect(outputBuffer).toEqual("20");
    operator.transactionRollback();
    operator.get("a");
    expect(outputBuffer).toEqual("10");
    operator.transactionRollback();
    operator.get("a");
    expect(outputBuffer).toEqual("NULL");
  });

  it("# sample 4", () => {
    operator.transactionBegin();
    operator.set("a", 30);
    operator.transactionBegin();
    operator.set("a", 40);
    operator.transactionCommit();
    operator.get("a");
    expect(outputBuffer).toEqual("40");
    operator.transactionRollback();
    expect(outputBuffer).toEqual("NO TRANSACTION");
  });

  it("# sample 5", () => {
    operator.set("a", 50);
    operator.transactionBegin();
    operator.get("a");
    expect(outputBuffer).toEqual("50");
    operator.set("a", 60);
    operator.transactionBegin();
    operator.unset("a");
    operator.get("a");
    expect(outputBuffer).toEqual("NULL");
    operator.transactionRollback();
    operator.get("a");
    expect(outputBuffer).toEqual("60");
    operator.transactionCommit();
    operator.get("a");
    expect(outputBuffer).toEqual("60");
  });

  it("# sample 6", () => {
    operator.set("a", 10);
    operator.transactionBegin();
    operator.numEqualTo(10);
    expect(outputBuffer).toEqual("1");
    operator.transactionBegin();
    operator.unset("a");
    operator.numEqualTo(0);
    expect(outputBuffer).toEqual("0");    
    operator.transactionRollback();
    operator.numEqualTo(10);
    expect(outputBuffer).toEqual("1");    
    operator.transactionCommit();
  });
});
