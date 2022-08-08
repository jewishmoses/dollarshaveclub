import { useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/app";

const Step = () => {

    const { stepOneOptions, setStepOneOptions, setStep } = useContext(AppContext)
    const [disabled, setDisabled] = useState(true);

    const handleCheck = (event) => {

        const name = event.target.name;

        // TODO: take care of "I don't shave" edge case
        setStepOneOptions(
            stepOneOptions.map((option) =>
                // Here you accept a id argument to the function and replace it with hard coded 🤪 2, to make it dynamic.
                option.name === name
                    ? { ...option, checked: !option.checked } : { ...option }
            )
        );

    };

    useEffect(() => {

        const anyChecked = stepOneOptions.filter(option => option.checked).length > 0;

        // TODO: don't rerender disabled when it's already set to false and it should stay on false.

        if (anyChecked) {

            setDisabled(false);
            return;

        }

        if (disabled) {

            return;
        }

        setDisabled(true);

    }, [stepOneOptions])

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                What do you shave?
            </h1>
            <small>Select all that apply. (required)</small>
            <div className="mb-5">

                {stepOneOptions.map((option, index) => (
                    <button key={index} onClick={handleCheck} name={option.name} type="button" className={option.checked ? 'checkbox bg-gray-500 hover:bg-gray-700 text-white font-bold py-8 px-12 rounded border-solid border-2 border-blue-600' : 'checkbox bg-gray-500 hover:bg-gray-700 text-white font-bold py-8 px-12 rounded mr-5'}>
                        {option.name}
                        {option.checked ?

                            <div className='checkbox-icon'>
                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                            </div>
                            :
                            ''
                        }
                    </button>
                ))}

            </div>

            <button onClick={() => setStep(2)} type="button" className='disabled:bg-gray-500 bg-gray-700 text-white font-bold py-8 px-12 rounded mr-5' disabled={disabled}>
                Next
            </button>

        </>
    )
}

export default Step;