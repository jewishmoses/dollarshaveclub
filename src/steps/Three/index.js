import './index.css';
import { useContext, useEffect, useState, useRef } from 'react';
import AppContext from '../../contexts/app';
import Checkbox from '../../components/Checkbox';
import { useTranslation } from 'react-i18next';
import { scrollToComponent } from '../../utilities';

const Step = () => {

    const { stepThreeOptions, setStepThreeOptions, setStep, step } = useContext(AppContext);
    const [disabled, setDisabled] = useState(true);
    const { t } = useTranslation();
    const stepRef = useRef(null);

    const handleCheck = (event) => {

        const name = event.target.name;

        // TODO: take care of "I don't shave" edge case
        setStepThreeOptions(
            stepThreeOptions.map((option) =>
                option.name === name
                    ? { ...option, checked: !option.checked } : { ...option }
            )
        );

    };


    useEffect(() => {

        const anyChecked = stepThreeOptions.filter(option => option.checked).length > 0;

        // TODO: don't rerender disabled when it's already set to false and it should stay on false.

        if (anyChecked) {

            setDisabled(false);
            return;

        }

        if (disabled) {

            return;
        }

        setDisabled(true);

    }, [stepThreeOptions])

    useEffect(() => { scrollToComponent(step, 3, stepRef); });

    return (
        <div ref={stepRef} className='mt-5 md:mt-0 md:min-h-screen mx-auto w-3/4 text-center md:p-10'>
            <h1 className="text-3xl mb-5 font-bold">
                {t("Any problems when you shave?")}
            </h1>
            <small className='mb-5 block'>{t("Select all that apply. (required)")}</small>
            <div className="mb-5">

                {stepThreeOptions.map((option, index) => (

                    <Checkbox key={index} onClick={handleCheck} name={option.name} title={t(option.name)} type="button" checked={option.checked} />

                ))}

            </div>

            <button onClick={() => setStep(4)} type="button" className='disabled:bg-gray-500 bg-gray-700 text-white font-bold py-8 px-12 rounded mr-5' disabled={disabled}>
                {t("Next")}
            </button>
        </div>
    );

};

export default Step;