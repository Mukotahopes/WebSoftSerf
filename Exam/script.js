
const todo = {
    action(e) {
      const target = e.target;
      if (target.classList.contains('todo__action')) {
        const action = target.dataset.todoAction;
        const elemItem = target.closest('.todo__item');
        if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
          elemItem.remove();
        } else if(action === 'details'){
          console.log()
            $(elemItem.querySelector('.todo_more_form')).toggleClass('todo_more_form_action')
         
        }else{
          elemItem.dataset.todoState = action;
        }
        this.save();
      } else if (target.classList.contains('todo__add')) {
        $('.todo_add_form').toggleClass('todo_add_form_action')
        this.add();
        this.save();
      } else if(target.classList.contains('item_btn'))
      {
        this.add();
        this.save();
      }else if(target.classList.contains('todo__text')){
        document.querySelector('#todo__text').oninput = function(){
          val = this.value.trim();
          elasticItems = document.querySelectorAll('.todo__item');
          console.log(val);
          if(val!=''){
            elasticItems.forEach(function(elem){
              if(elem.innerText.search(val)==-1){
                elem.classList.add('hide');
              }else{
                elem.classList.remove('hide');
              }
            });
          }
          else{
            elasticItems.forEach(function(elem){
              elem.classList.remove('hide');
            })
      
          }
        }
      } 
    },
    add() {
      const elemName = document.querySelector('.text_name');
      const elemDeadline = document.querySelector('.text_deadline');
      const elemDiscription = document.querySelector('.text_discription');
      const elemPriority = document.querySelector('.text_priority');
      if (elemName.disabled || !elemName.value.length||elemDeadline.disabled || !elemDeadline.value.length ||elemDiscription.disabled || !elemDiscription.value.length) {
        return;
      }
      document.querySelector('.todo__items').insertAdjacentHTML('beforeend', this.create(elemName.value,elemDeadline.value,elemPriority.value,elemDiscription.value));
      elemName.value = '';
    },
    create(text,deadline,priority,discription) {
      return `<li class="todo__item" data-todo-state="active">
        <span class="todo__task">
          ${text}
        </span>
        <div class="dedl">
        Dedline: ${deadline}
        </div>
        <div class="priority">
        Priority: ${priority}
        </div>
        <span class="todo__action todo__action_restore" data-todo-action="active"></span>
        <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
        <span class="todo__action todo__action_details" data-todo-action="details"></span>
        <span class="todo__action todo__action_delete" data-todo-action="deleted"></span>
        <div class="todo_more">
        <div class="todo_more_form">
          <div class="item_form">
           <span>${text} </span>
          </div>
          <div class="item_form">
            <span>${discription}</span>
          </div>
          <div class="item_form">
            <span>${deadline}</span>
          </div>
          <div class="item_form">
            <span>${priority}</span>
          </div>
        </div>
        </li>`;
        
    },
    init() {
      const fromStorage = localStorage.getItem('todo');
      if (fromStorage) {
        document.querySelector('.todo__items').innerHTML = fromStorage;
      }
      document.querySelector('.todo__options').addEventListener('change', this.update);
      document.addEventListener('click', this.action.bind(this));
    },
    update() {
      const option = document.querySelector('.todo__options').value;
      document.querySelector('.todo__items').dataset.todoOption = option;
      document.querySelector('.todo__text').disabled = option !== 'active';
    },
    save() {
      localStorage.setItem('todo', document.querySelector('.todo__items').innerHTML);
    },
    
    
  };
  
  todo.init();