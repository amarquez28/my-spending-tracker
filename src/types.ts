//in this file you can store your interfaces which are like structs in C they define the structure of objects
//export so it can be publically accessed by other files
export interface Expense{
    id: string;
    description: string;
    amount: number;
    category: string;
}