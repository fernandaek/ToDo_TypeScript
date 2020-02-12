import { IServiceTodo } from "./services/iServiceTodo";
import { ServiceTodo } from "./services/serviceTodo";
import { Todo } from "./models/todo";

window.onload = function(){
    // alert("It's working")
    let main = new Main(new ServiceTodo);
    main.start();
}


export class Main {
    service: IServiceTodo;
    constructor(service: IServiceTodo){
        this.service = service;
    }
    
    items: Todo[] = [];
    

    deleteHandler(position:number){
        let list = document.getElementsByTagName("LI");
        for(let i = 0; i < list.length; i++){
            list[i].addEventListener("click", ((item) => {
                return function(){
                    console.log(item)
                }
            })(i))
        }
        
    }

    deleteButton(){
        let myNodeList = document.getElementsByTagName("LI");
        for(let i = 0; i < myNodeList.length; i++){
            let span = document.createElement("SPAN");
            let txt = document.createTextNode("\u00D7");
            span.id = "close";
            span.appendChild(txt);
            myNodeList[i].appendChild(span);
        }
    }
    
    createTodos(){
        let li = document.createElement("LI");
        let check = document.createElement("INPUT") as HTMLInputElement;
        check.type = "checkbox";
        check.id = "myCheckbox";
        check.value = "";
        let inputValue = (<HTMLInputElement>document.getElementById("todoText")).value;
        let text = document.createTextNode(inputValue);
        let array = new Todo(inputValue, false);
        array.Text = inputValue
        this.items.push(array);
        let newItems = this.service.getTodo().concat(this.items);
        
        
        li.appendChild(check)
        li.appendChild(text);
        
        if(inputValue ===''){
            alert("You must write a task before click to add!");
        }
        
        else {
            document.getElementById("todoList").appendChild(li);
            this.deleteButton();
            this.deleteHandler();
        }
        console.log("My new items", newItems)
    }
    
    strikeThrough(){
        let list = document.querySelector("UL");
        list.addEventListener("click", (event) => {
            let x = event.target as HTMLElement;
            if( x.tagName === "LI"){
                x.classList.toggle("checked")

            } 
        })
    }

    
    printTodos(){
        let myTodos = this.service.getTodo()

        for(let i in myTodos){
            if(myTodos.hasOwnProperty(i) === true){
                let node = document.createElement("LI");
                let check = document.createElement("INPUT") as HTMLInputElement;
                check.type = "checkbox";
                check.id = "myCheckbox";
                check.value = "";
                check.checked = myTodos[i].IsCompleted
                let textNode = document.createTextNode(myTodos[i].Text)
                
                node.appendChild(check)
                node.appendChild(textNode);
                
                document.getElementById("todoList").appendChild(node)
                if(check.checked == true){
                    node.classList.toggle("checked")
                }
              
            }
        }
    }
    

    start(){
        document.getElementById("addBtn").addEventListener('click', () => this.createTodos());   
        this.printTodos();
        this.strikeThrough();
        this.deleteButton();
        this.deleteHandler()
        // document.getElementById("close").addEventListener('click', () => this.deleteHandler());
    }
}