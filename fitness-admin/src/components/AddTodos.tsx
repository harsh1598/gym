import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addTodo } from "../features/todo/todoSlice";

function AddTodos() {

    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const addTodoHandler = (e: any) => {
        e.preventDefault();
        dispatch(addTodo(input))
        setInput('')
    }

    return (
        <form onSubmit={addTodoHandler} className="mt-2">
            <div className="mb-3">
                <input type="text"
                    className="form-control"
                    placeholder="Enter a Todo.."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default AddTodos;
