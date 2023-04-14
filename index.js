const React = window.React;
const ReactDOM = window.ReactDOM;

window.Form = function ({ formProps, id, componentsStyles }) {
  const handleClick = (e) => {
    const stepNumber = parseInt(e.target.getAttribute("step_number"));

    navigateToFormStep(stepNumber + 1, id);
  };

  function navigateToFormStep(stepNumber) {
    if (
      Array.from(document.querySelectorAll(`.${id}-form-step`)).length ===
      stepNumber - 1
    ) {
      return;
    }

    /**
     * Hide all form steps.
     */
    document.querySelectorAll(`.${id}-form-step`).forEach((formStepElement) => {
      formStepElement.classList.add("hidden");
    });

    /**
     * Show next form step
     */
    document
      .querySelector(`#step-${id}-${stepNumber}`)
      .classList.remove("hidden");
  }

  return (
    <>
      <form>
        {formProps.steps.map((stepForm, index) => (
          <section
            id={`step-${id}-${index + 1}`}
            className={`${componentsStyles.width} ${componentsStyles.height} ${
              componentsStyles.formBg
            } ${componentsStyles.formColor} ${
              index !== 0 && "hidden"
            } ${id}-form-step form-step`}
            key={`form-${index}`}
          >
            <div class="flex justify-between items-center">
              <h2 class="font-normal">
                Instant Shipping Quote <br /> Calculator
              </h2>
              <span class="form-stepper-circle">
                <span>
                  {index + 1} / {formProps.steps.length}
                </span>
              </span>
            </div>
            <div className={`${componentsStyles?.sectionHeight} mt-3`}>
              {stepForm.map((input, index) => (
                <div key={`${input.name}-${index}`}>
                  <label className="block">{input.field}</label>
                  <input
                    className={`${componentsStyles.placeholcerColor}`}
                    placeholder={`${input.placeholder}`}
                    name={`${input.name}`}
                    {...input.validations}
                  />
                </div>
              ))}
            </div>
            <div class="mt-3">
              <div class="flex justify-end">
                <button
                  className={`${componentsStyles.buttonBg} ${componentsStyles.buttonColor} button btn-navigate-form-step`}
                  type="button"
                  step_number={`${index + 1}`}
                  onClick={handleClick}
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        ))}
      </form>
    </>
  );
};

window.renderForm = function (formProps, id) {
  const componentsStyles = {
    placeholcerColor: `placeholder:text-[${formProps?.placeholder_color}]`,
    formBg: `bg-[${formProps?.background}]`,
    formColor: `text-[${formProps?.color}]`,
    buttonBg: `${`bg-[${
      formProps?.bgButton ? formProps?.bgButton : "#4361ee"
    }]`}`,
    buttonColor: `text-[${
      formProps?.colorButton ? formProps?.colorButton : "#fffff"
    }]`,
    height: `min-h-[${formProps.height}px]`,
    width: `min-w-[${formProps.width}px]`,
    sectionHeight: `min-h-[${
      formProps.height ? formProps.height / 1.6 : 264
    }px]`,
  };

  const root = ReactDOM.createRoot(document.getElementById("form-basic"));
  root.render(
    <window.Form
      formProps={formProps}
      id={id}
      componentsStyles={componentsStyles}
    />
  );
};
