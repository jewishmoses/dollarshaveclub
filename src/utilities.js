const scrollToComponent = (currentStep, componentStep, ref) => {

    if(currentStep !== componentStep) return;

    ref.current.scrollIntoView();

};

module.exports = { scrollToComponent };