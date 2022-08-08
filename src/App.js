import './App.css';
import { useState } from 'react';
import StepOne from './steps/One';
import StepTwo from './steps/Two';
import StepThree from './steps/Three';
import StepFour from './steps/Four';
import AppContext from './contexts/app';

const defaultStepOneOptions = [
    { name: 'Head', checked: false, },
    { name: 'Face', checked: false, },
    { name: 'Armpits', checked: false, },
    { name: 'Private bits', checked: false, },
    { name: 'Legs', checked: false, },
    { name: 'Neck only', checked: false, },
    { name: 'Other', checked: false, },
    { name: "I don't shave", checked: false },
];

const defaultStepTwoOptions = [
    { name: 'Daily', checked: false, },
    { name: 'Weekly', checked: false, },
    { name: 'Rarely', checked: false, },
];

const defaultStepThreeOptions = [
    { name: 'Redness/irritation', checked: false, },
    { name: 'Razor burn', checked: false, },
    { name: 'Dryness', checked: false, },
    { name: 'It grows back too fast', checked: false, },
    { name: 'Nicks/cuts', checked: false, },
    { name: 'None', checked: false, },
];

const defaultStepFourOptions = [
    { name: 'Fine lines/wrinkles', checked: false, },
    { name: 'Sensitive skin', checked: false, },
    { name: 'Acne-prone skin', checked: false, },
    { name: 'Dandruff', checked: false, },
    { name: 'Really, really dry skin', checked: false, },
    { name: 'Chapped lips', checked: false, },
    { name: 'Oily skin', checked: false, },
    { name: 'None', checked: false, },
];

function App() {

    const [stepOneOptions, setStepOneOptions] = useState(defaultStepOneOptions);
    const [stepTwoOptions, setStepTwoOptions] = useState(defaultStepTwoOptions);
    const [stepThreeOptions, setStepThreeOptions] = useState(defaultStepThreeOptions);
    const [stepFourOptions, setStepFourOptions] = useState(defaultStepFourOptions);
    const [step, setStep] = useState();

    const context = {
        stepOneOptions, setStepOneOptions,
        stepTwoOptions, setStepTwoOptions,
        stepThreeOptions, setStepThreeOptions,
        stepFourOptions, setStepFourOptions,
        step, setStep
    }


    const Step = () => {

        switch (step) {

            case 2: return <StepTwo />;
            case 3: return <StepThree />;
            case 4: return <StepFour />;
            default: return <StepOne />;
        }
    }

    return (
        <AppContext.Provider value={context}>
            <Step />
        </AppContext.Provider>
    );
}

export default App;
