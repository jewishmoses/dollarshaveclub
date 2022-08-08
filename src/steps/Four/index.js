import './index.css';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/app';
import Checkbox from '../../components/Checkbox';

const Step = () => {

    const { stepFourOptions, setStepFourOptions, setStep } = useContext(AppContext);
    const [disabled, setDisabled] = useState(true);

    const handleCheck = (event) => {

        const name = event.target.name;

        // TODO: take care of "I don't shave" edge case
        setStepFourOptions(
            stepFourOptions.map((check) =>
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
        <div className='min-h-screen'>
            <h1 className="text-3xl font-bold underline">
                Are you worried about any of the following issues?
            </h1>
            <small>Select all that apply. (required)</small>
            <div className="">

                <div className="mb-5">

                    {stepFourOptions.map((option, index) => (

                        <Checkbox key={index} onClick={handleCheck} name={option.name} type="button" checked={option.checked} />

                    ))}

                </div>

            </div>

            <button onClick={() => setStep(4)} type="button" className='disabled:bg-gray-500 bg-gray-700 text-white font-bold py-8 px-12 rounded mr-5' disabled={disabled}>
                Next
            </button>
        </div>
    );

};

export default Step;