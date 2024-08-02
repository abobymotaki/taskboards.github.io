var task = document.querySelectorAll('.tasks ul');



var addButton = document.getElementById('add');
var taskName = document.getElementById('input');
function addTask() {
    if (taskName.value.length <= 8) {
        window.alert('Task is too short!');
    }

    else {
        var li = document.createElement('li');
        li.className = 'task';
    
        var span = document.createElement('span');
        span.className = 'unstrike';
        span.innerHTML = taskName.value;
    
        var buttons = document.createElement('div');
        buttons.className = 'buttons';
    
        var completeButton = document.createElement('button');
        completeButton.className = 'incomplete';
        completeButton.innerText = '▢';
    
        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.innerText = '✘';
    
        buttons.appendChild(completeButton);
        buttons.appendChild(deleteButton);
    
        li.appendChild(span);
        li.appendChild(buttons);
    
        var ul = document.getElementById('tasklist');
        ul.appendChild(li);
    
        console.log("Task " + taskName.value + " has been added to taskboard!");
    
        taskName.value = '';
    }
}

addButton.addEventListener('click', function () {
    addTask();
});
taskName.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});



document.getElementById('tasklist').addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('incomplete') || target.classList.contains('complete')) {
        var listItem = target.closest('li');
        var text = listItem.querySelector('span');

        if (target.className === 'incomplete') {
            target.className = 'complete';
            target.innerText = '▣';
            text.className = 'strike';
        } else {
            target.className = 'incomplete';
            target.innerText = '▢';
            text.className = 'unstrike';
        }
    }

    if (target.classList.contains('delete')) {
        var li = target.closest('li');
        var liSpan = li.querySelector('span');
        var spanText = liSpan.innerText;
        if (li) {
            li.parentElement.removeChild(li);
            console.log("'" + spanText + "' has been removed");
        }
    }
});


task.forEach(function (editor) {
    editor.addEventListener('click', function (searchSpan) {
        if (searchSpan.target.classList.contains('unstrike') || searchSpan.target.classList.contains('strike')) {
            var li = searchSpan.target.closest('li');
            if (li) {
                var span = li.querySelector('span');
                if (span) {
                    span.parentElement.removeChild(span);

                    var input = document.createElement('input');
                    input.className = 'editing';
                    
                    var buttondDiv = li.querySelector('.buttons');
                    li.insertBefore(input, buttondDiv);

                    function setInput() {
                        if (input.value.length <= 8) {
                            window.alert('Not enough Characters! [Minimum Characters = 9]');
                        }

                        else {
                            var newSpan = document.createElement('span');
                            newSpan.innerText = input.value;
                            newSpan.className = 'unstrike';
                            
                            li.removeChild(input);
                            li.insertBefore(newSpan, buttondDiv);
                        }
                    };

                    input.addEventListener('blur', setInput);
                    
                    input.addEventListener('keypress', function (event) {
                        if (event.key === 'Enter') {
                            setInput();
                        }
                    });
                }
            }
        }
    });
});
