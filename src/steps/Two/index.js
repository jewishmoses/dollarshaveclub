import './index.css';
import { useContext, useState, useEffect } from 'react';
import AppContext from '../../contexts/app';
import Checkbox from '../../components/Checkbox';
import { useTranslation } from 'react-i18next';

const Step = () => {

    const { stepTwoOptions, setStepTwoOptions, setStep } = useContext(AppContext);
    const [disabled, setDisabled] = useState(true);
    const { t } = useTranslation();

    const handleCheck = (event) => {

        const name = event.target.name;
        
        // TODO: only one can be selected here
        
        setStepTwoOptions(
            stepTwoOptions.map((check) =>
                check.name === name
                ? { ...check, checked: !check.checked } : { ...check }
            )
        );

    };

    useEffect(() => {

        const anyChecked = stepTwoOptions.filter(option => option.checked).length > 0;

        // TODO: don't rerender disabled when it's already set to false and it should stay on false.

        if (anyChecked) {

            setDisabled(false);
            return;

        }

        if (disabled) {

            return;
        }

        setDisabled(true);

    }, [stepTwoOptions])



    return (
        <div className='min-h-screen mx-auto w-3/4 text-center'>
            <h1 className="text-3xl mb-5 font-bold">
                {t("How often do you shave?")}
            </h1>
            <small className='mb-5 block'>{t("Select one. (required)")}</small>
            <div className="mb-5">

                {stepTwoOptions.map((option, index) => (

                    <Checkbox key={index} onClick={handleCheck} name={option.name} title={t(option.name)} type="button" checked={option.checked} />

                ))}

            </div>

            <button onClick={() => setStep(3)} type="button" className='disabled:bg-gray-500 bg-gray-700 text-white font-bold py-8 px-12 rounded mr-5' disabled={disabled}>
                {t("Next")}
            </button>
        </div>
    );

};

export default Step;