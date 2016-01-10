'use strict';
(function(){

	function TasksQueue() {
		this.$maxNum = 3;
		this.$done = 0;
		this.$tasks = [];
	};

	TasksQueue.prototype.addTask = function(task) {
		if (!("id" in task)) {
			task["id"] = this.$maxNum+1;
			this.$tasks.push(task);
			this.$maxNum+=1;
		}
		else {
			for (i in this.$tasks) {
				if (this.$tasks[i].id == task.id)
					{
						this.$tasks[i].title = task.title;
						this.$tasks[i].comment = task.comment;
					}
			}			
		}
        localStorage.setItem("todo-list-items", JSON.stringify(this.$tasks));
	};
	TasksQueue.prototype.getTask = function(id) {
		for (i in this.$tasks) {
			var task = this.$tasks[i];	
			if (task.id == id)
				return task;
		}
	};
	TasksQueue.prototype.getTasks = function() {
		this.$tasks = JSON.parse(localStorage.getItem("todo-list-items"));
		if (!this.$tasks)
		{
			this.$tasks = [];
	        localStorage.setItem("todo-list-items", JSON.stringify(this.$tasks));
		} 
		this.$done = JSON.parse(localStorage.getItem("todo-list-done"));
		if (!this.$done) 
			{
				this.$done = 0;
		        localStorage.setItem("todo-list-done", JSON.stringify(this.$done));
			}
        return this.$tasks;
	};
	TasksQueue.prototype.removeTask = function(id) {
		for (i in this.$tasks) {
			if (this.$tasks[i].id == id){
				this.$tasks.splice(i,1);
				console.log(this.$tasks);
		        localStorage.setItem("todo-list-items", JSON.stringify(this.$tasks));
				return;
			}
		}
	};
	TasksQueue.prototype.completeTask = function(id) {
		this.$done+=1;
        localStorage.setItem("todo-list-done", JSON.stringify(this.$done));		
        this.removeTask(id);
	};
	TasksQueue.prototype.getCount = function() {
		return this.$tasks.length;
	};
	TasksQueue.prototype.getCountDone = function() {
		return this.$done;
	};

	window.TasksQueue = TasksQueue;

})();