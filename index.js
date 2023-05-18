const React = window.React;
const ReactDOM = window.ReactDOM;

window.Form = function ({ formProps, id, componentsStyles }) {
  const [errors, setErrors] = React.useState({});
  const [formState, setFormState] = React.useState({});
  const handleClick = (e) => {
    const stepNumber = parseInt(e.target.getAttribute("step_number"));
    navigateToFormStep(stepNumber + 1, id);
  };

  function handleBack(e) {
    const stepNumber = parseInt(e.target.getAttribute("step_number"));
    console.log(stepNumber, "handle back");
    /**
     * Hide all form steps.
     */
    document.querySelectorAll(`.${id}-form-step`).forEach((formStepElement) => {
      formStepElement?.classList.add("hidden");
    });

    /**
     * Show next form step
     */
    document
      .querySelector(`#step-${id}-${stepNumber + 1}`)
      .classList?.remove("hidden");
  }

  function navigateToFormStep(stepNumber) {
    if (
      Array.from(document.querySelectorAll(`.${id}-form-step`)).length ===
      stepNumber - 1
    ) {
      return;
    }

    // Validation
    const inputs = Array.from(
      document
        .querySelector(`#step-${id}-${stepNumber - 1}`)
        .getElementsByTagName("input")
    );

    const selects = Array.from(
      document
        .querySelector(`#step-${id}-${stepNumber - 1}`)
        .getElementsByTagName("select")
    );
    let flag = 0;

    selects.forEach((select) => {
      if (!select.checkValidity()) {
        setInputValid(select);
        flag++;
      }
    });

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        setInputValid(input);
        flag++;
      }
    });

    if (flag > 0) return;

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

  function setInputValid(input) {
    if (!input.checkValidity()) {
      return setErrors((prev) => {
        return { ...prev, [input.name]: input.validationMessage };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, [input.name]: "" };
      });
      setFormState((prev) => {
        return {
          ...prev,
          [input.name]: input.value,
        };
      });
    }
  }

  function finalInput(input) {
    return (
      <>
        {input?.select ? (
          <select className="mt-3 pl-4">
            {input.options.map((option, index) => (
              <option value={option.value} key={`${option.value}-${index}`}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <>
            <label className="block">{input.field}</label>
            <input
              className={``}
              placeholder={`${input.placeholder}`}
              name={`${input.name}`}
              type={input?.type || "text"}
              {...input.validations}
            />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <form onChange={(e) => setInputValid(e.target)}>
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
            <div className="flex justify-between items-center">
              <h2 className="font-normal">
                Instant Shipping Quote <br /> Calculator
              </h2>
              <span className="form-stepper-circle">
                <span>
                  {index + 1} / {formProps.steps.length}
                </span>
              </span>
            </div>
            <div className={`${componentsStyles?.sectionHeight} mt-3`}>
              {stepForm.map((input, index) => (
                <div key={`${input.name}-${index}`}>
                  {input.customElement ? (
                    <div className="mt-3">{input.customElement}</div>
                  ) : (
                    finalInput(input)
                  )}

                  <span className="text-red-600 text-xs	">
                    {errors[input.name]}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <div className="flex justify-between">
                <button
                  className={`${componentsStyles.buttonBg} ${
                    index === 0 && `bg-white text-[#006EF7]`
                  } ${
                    componentsStyles.buttonColor
                  } button btn-navigate-form-step`}
                  type="button"
                  disabled={index === 0}
                  step_number={`${index - 1}`}
                  onClick={handleBack}
                >
                  Back
                </button>
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