import { v4 as uuidv4 } from 'uuid';
import { IAction, ITodo } from '../interface';
import {
	ADD_TODO,
	CHANGE_CHECKED_TODO,
	DELETE_TODO,
	EDIT_TODO,
	CLEAR_COMPLETED_TODO,
} from '../actions/todo.actions';

const initialStateTodos: Array<ITodo> = [
	{ id: uuidv4(), todo: 'Complete online javaScript course', checked: true },
	{ id: uuidv4(), todo: 'Jog around the park 3x', checked: false },
	{ id: uuidv4(), todo: '10 minutes meditation', checked: false },
	{ id: uuidv4(), todo: 'Read for 1 hour', checked: false },
	{ id: uuidv4(), todo: 'Pick up groceries', checked: false },
	{ id: uuidv4(), todo: 'Complete Todo App on Frontend Mentor', checked: false },
];

const todosReducer = (state = initialStateTodos, action: IAction): Array<ITodo> => {
	if (localStorage.getItem('todosData'))
		state = JSON.parse(localStorage.getItem('todosData') || '');

	switch (action.type) {
		case ADD_TODO:
			state = [...state, { id: uuidv4(), todo: action.payload, checked: false }];
			localStorage.setItem('todosData', JSON.stringify(state));
			return state;
		case CHANGE_CHECKED_TODO:
			state = state.map(todo => {
				if (todo.id === action.payload.id) todo.checked = action.payload.checked;
				return todo;
			});
			localStorage.setItem('todosData', JSON.stringify(state));
			return state;

		case DELETE_TODO:
			state = state.filter(todo => todo.id !== action.payload);
			localStorage.setItem('todosData', JSON.stringify(state));
			return state;

		case EDIT_TODO:
			return (state = state.map(todo => {
				if (todo.id === action.payload.id) todo.todo = action.payload.todo;
				return todo;
			}));

		case CLEAR_COMPLETED_TODO:
			state = state.filter(todo => {
				if (todo.checked === false) {
					return true;
				}
				return false;
			});
			localStorage.setItem('todosData', JSON.stringify(state));
			return state;

		default:
			return state;
	}
};

export default todosReducer;
