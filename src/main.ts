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
                this.items.splice(i, 1);
                this.printTodos();
                this.strikeThrough();
                this.deleteButton();
                this.deleteHandler();
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
            this.strikeThrough();
            this.deleteButton();
            this.deleteHandler();
        }
        console.log(this.items)
    }

    strikeThrough() {
        let list = document.getElementsByTagName("LI");
        for(let i = 0; i < list.length; i++){
            document.getElementById(`list${i}`).addEventListener("click", () => {
                let x = event.target as HTMLElement;
                 if (this.items[i].IsCompleted == true) {
                    this.items[i].IsCompleted = false
                    x.classList.toggle("checked")
                    console.log(this.items)
                 }
                 else if(this.items[i].IsCompleted == false){
                    this.items[i].IsCompleted = true
                    x.classList.toggle("checked")
                    console.log(this.items)
                 }
                }

            )

         }
        
    }


    printTodos() {
        let ul = document.getElementById("todoList");
        ul.innerHTML = "";
        for (let i in this.items) {
            if (this.items.hasOwnProperty(i) === true) {
                let node = document.createElement("LI");
                node.setAttribute("id", `list${i}`)

                let textNode = document.createTextNode(this.items[i].Text)

                node.addEventListener('click', this.strikeThrough);
                node.appendChild(textNode);

                ul.appendChild(node)
                if (this.items[i].IsCompleted == true) {
                    node.classList.toggle("checked")

                }
            }
        }
    }


    start() {
        this.items = this.service.getTodo()
        document.getElementById("sortBtn").addEventListener('click', () => {
            this.sortHandler()
            this.printTodos()
            this.deleteButton()
            this.deleteHandler()
            this.strikeThrough()
        })
        document.getElementById("addBtn").addEventListener('click', () => this.createTodos());
        this.printTodos();
        console.log(this.items)
        this.strikeThrough();
        this.deleteButton();
        this.deleteHandler();
    }
}