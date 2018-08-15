class TodoController < ApplicationController
  before_action :authenticate_user

  def index
    @todos = current_user.todos
    render json: @todos
  end

  def create
    @todo = current_user.todos.new(todo_params)
    if @todo.save
     render json: @todo
    else
     render json: @todo.errors, status: :bad_request
    end
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.title = todo_params[:title]
    @todo.deadline = todo_params[:deadline]
    @todo.is_done = todo_params[:is_done]
    if @todo.save
      render json: @todo
    else
      render json: @todo.errors, status: :bad_request
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    render json: @todo
  end

  private
    def todo_params
      params.require(:todo).permit(:title, :deadline, :is_done)
    end
end
