import './index.css';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/app';


const Step = () => {

    const { stepFourOptions, setStepFourOptions, setStep } = useContext(AppContext);
    const [disabled, setDisabled] = useState(true);

    const handleCheck = (event) => {

        const name = event.target.name;
        
        // TODO: take care of "I don't shave" edge case
        setStepFourOptions(
            stepFourOptions.map((check) =>
                // Here you accept a id argument to the function and replace it with hard coded 🤪 2, to make it dynamic.
                check.name === name
                ? { ...check, checked: !check.checked } : { ...check }
            )
        );

    };

    useEffect(() => {

        const anyChecked = stepFourOptions.filter(option => option.checked).length > 0;

        // TODO: don't rerender disabled when it's already set to false and it should stay on false.

        if (anyChecked) {

            setDisabled(false);
            return;

        }

        if (disabled) {

            return;
        }

        setDisabled(true);

    }, [stepFourOptions])

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Are you worried about any of the following issues?
            </h1>
            <small>Select all that apply. (required)</small>
            <div className="">

                {stepFourOptions.map((check, index) => (
                    <button key={index} onClick={handleCheck} name={check.name} type="button" className={check.checked ? 'checkbox bg-gray-500 hover:bg-gray-700 text-white font-bold py-8 px-12 rounded border-solid border-2 border-blue-600' : 'checkbox bg-gray-500 hover:bg-gray-700 text-white font-bold py-8 px-12 rounded mr-5'}>
                        {check.name}
                        {check.checked ?

                            <div className='checkbox-icon'>
                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                            </div>
                            :
                            ''
                        }
                    </button>
                ))}

            </div>

            <button onClick={() => setStep(4)} type="button" className='disabled:bg-gray-500 bg-gray-700 text-white font-bold py-8 px-12 rounded mr-5' disabled={disabled}>
                Next
            </button>
        </>
    );

};

export default Step;