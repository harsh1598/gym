import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

function Todo() {

    const todos = useSelector((state: any) => state.todos);
    const dispatch = useDispatch();

    return (
        <div className="Todo">
            <h1>Todos</h1>
            <table className="table">
                <thead>
                    {
                        todos.map((todo: any) => {
                            return (
                                <tr>
                                    <th scope="col" key={todo.id}>  {todo.text}
                                        <button onClick={() => dispatch(removeTodo(todo.id))}>X</button></th>
                                </tr>)
                        })
                    }
                </thead>
            </table>
        </div>
    );
}

export default Todo;
