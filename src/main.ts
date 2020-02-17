import { IServiceTodo } from "./services/iServiceTodo";
import { ServiceTodo } from "./services/serviceTodo";
import { Todo } from "./models/todo";

window.onload = function () {
    // alert("It's working")
    let main = new Main(new ServiceTodo);
    main.start();
}


export class Main {
    service: IServiceTodo;
    constructor(service: IServiceTodo) {
        this.service = service;
        this.deleteHandler = this.deleteHandler.bind(this);
        this.strikeThrough = this.strikeThrough.bind(this);
    }

    items: Todo[] = [];

    sortHandler(){
        let list = document.getElementsByTagName("LI");
        for (let i = 0; i < list.length; i++) {
            this.items.reverse();
                this.items.sort((a, b)=> {
                    if(a.IsCompleted){
                        return 1;
                    }
                    else if(b.IsCompleted){
                        return -1
                    }
                })
            }
        console.log(this.items)
    }

    deleteHandler() {
        let list = document.getElementsByTagName("LI");

        for (let i = 0; i < list.length; i++) {
            document.getElementById(`close${i}`).addEventListener("click", () => {
                event.stopPropagation();
                this.items.splice(i, 1);
                this.printTodos();
            })
        }
    }

    deleteButton() {
        let list = document.getElementsByTagName("LI");
        for (let i = 0; i < list.length; i++) {
            let span = document.createElement("SPAN");
            let txt = document.createTextNode("\u00D7");
            span.setAttribute("id", `close${i}`);
            span.appendChild(txt);
            list[i].appendChild(span);
        }
    }

    createTodos() {
        let li = document.createElement("LI");
        let inputValue = (<HTMLInputElement>document.getElementById("todoText")).value.trim();
        let text = document.createTextNode(inputValue);
        let array = new Todo(inputValue, false);
        array.Text = inputValue
        this.items.push(array);

        li.appendChild(text);

        if (inputValue === '') {
            alert("You must write a task before click to add!");
        }

        else {
            document.getElementById("todoList").appendChild(li);
            this.printTodos();
        }
        console.log(this.items)
    }

    strikeThrough(e) {
        let x = e.target.id 
        if(this.items[x].IsCompleted){
            this.items[x].IsCompleted = false
        }
        else{
            this.items[x].IsCompleted = true
        }
        console.log(this.items)
        this.printTodos();   
    }


    printTodos() {
        let ul = document.getElementById("todoList");
        ul.innerHTML = "";
        for (let i in this.items) {
            if (this.items.hasOwnProperty(i) === true) {
                let node = document.createElement("LI");
                node.setAttribute("id", i)

                let textNode = document.createTextNode(this.items[i].Text)

                node.addEventListener('click', this.strikeThrough);
                node.appendChild(textNode);

                

                ul.appendChild(node)
                if (this.items[i].IsCompleted == true) {
                    node.classList.toggle("checked")

                }
            }
        }
        this.deleteButton();
        this.deleteHandler();
    }


    start() {
        this.items = this.service.getTodo()
        document.getElementById("sortBtn").addEventListener('click', () => {
            this.sortHandler()
            this.printTodos()
        })
        document.getElementById("addBtn").addEventListener('click', () => this.createTodos());
        this.printTodos();
        console.log(this.items)
    }
}