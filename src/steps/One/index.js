import { useContext, useEffect, useState } from "react";
import Checkbox from "../../components/Checkbox";
import AppContext from "../../contexts/app";

const Step = () => {

    const { stepOneOptions, setStepOneOptions, setStep } = useContext(AppContext)
    const [disabled, setDisabled] = useState(true);

    const handleCheck = (event) => {

        const name = event.target.name;

        // TODO: take care of "I don't shave" edge case
        setStepOneOptions(
            stepOneOptions.map((option) =>
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
        <div className="min-h-screen">
            <h1 className="text-3xl font-bold underline">
                What do you shave?
            </h1>
            <small>Select all that apply. (required)</small>
            <div className="mb-5">

                {stepOneOptions.map((option, index) => (

                    <Checkbox key={index} onClick={handleCheck} name={option.name} type="button" checked={option.checked} />

                ))}

            </div>

            <button onClick={() => setStep(2)} type="button" className='disabled:bg-gray-500 bg-gray-700 text-white font-bold py-8 px-12 rounded mr-5' disabled={disabled}>
                Next
            </button>

        </div>
    )
}

export default Step;