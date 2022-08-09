import { FaCheck as CheckIcon } from 'react-icons/fa';

const Checkbox = (props) => {

    return (
        <button {...props} className={props.checked ? 'checkbox py-8 px-12 bg-white mr-3 rounded font-light border border-solid border-black mb-2' : 'checkbox py-8 px-12 bg-white mr-3 rounded font-light mb-2'}>
            {props.title}
            {props.checked ? <CheckIcon className='checkbox-icon' /> : ''}
        </button>
    )

}

export default Checkbox;