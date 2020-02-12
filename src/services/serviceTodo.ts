import { IServiceTodo } from "./iServiceTodo";
import { Todo } from "../models/todo";

export class ServiceTodo implements IServiceTodo {

    getTodo(): Todo[] {
        let items: Todo[] = [
            {"Text": "Learn TypeScript", "IsCompleted": false},
            {"Text": "Boost JavaScript", "IsCompleted": true},
            {"Text": "Learn NodeJs", "IsCompleted": false},
            {"Text": "Learn ReactJS", "IsCompleted": true},
            {"Text": "Buy new online courses", "IsCompleted": false}

        ]
        const result: Todo[] = items.map(item => new Todo(item.Text, item.IsCompleted))
        return result;
    }
   
}

