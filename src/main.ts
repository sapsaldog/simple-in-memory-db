import readline from "readline-sync"
import operator from "../src/operator"


while(true){
    let cmdStr = readline.question("> ");

    try{
        const resultMatch = cmdStr.replace(/\s{2,}/g,' ').trim().split(" ");

        if(!resultMatch) throw Error("Couldn't parse the command");
    
        let first: string = resultMatch[0];
        let second: string|undefined = resultMatch[1];
        let third: string|undefined = resultMatch[2];
   
        switch(first.toLowerCase()){
            case "set":
                operator.set(second, parseInt(third, 10));
                break;
            case "get":
                operator.get(second);
                break;
            case "unset":
                operator.unset(second);
                break;
            case "numequalto":
                operator.numEqualTo(parseInt(second, 10));
                break;
            case "begin":
                operator.transactionBegin();
                break;
            case "commit":
                operator.transactionCommit();
                break;
            case "rollback":
                operator.transactionRollback();
                break;
            case "end":
                process.exit(0);
                break;
            case "reset":
                operator.reset();
                break;
            default:
                throw new Error("This program doesn't support this command");
        }
    }catch(e){
        console.error(`Can't handle '${cmdStr}' - ${e.message}`)
    }
}

