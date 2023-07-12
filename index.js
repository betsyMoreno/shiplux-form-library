const React = window.React;
const ReactDOM = window.ReactDOM;

const url = "https://web-server-v2-central1-unptqwe5da-uc.a.run.app/";

window.Form = function ({ formProps, id, componentsStyles }) {
  const [errors, setErrors] = React.useState({});
  const [formState, setFormState] = React.useState({ Vehicles: [] });
  const [cityZip, setCityZip] = React.useState({});
  const [isInternational, setIsInternational] = React.useState(formProps.isInternational);
  const [activeStep, setActiveStep] = React.useState(1);
  const [activeVehicle, setActiveVehicle] = React.useState(0);
  const [vechicleSelected, setVehicleSelected] = React.useState(0);

  async function handleCityZipLookup(e, input) {
    try {
      const cityZipData = await fetch(`${url}/locations/city-zip-lookup?input=${e.target.value}`);

      const jsonCityZipData = await cityZipData.json();
      setCityZip((prev) => {
        return { ...prev, [input.name]: jsonCityZipData };
      });
    } catch (error) {
      console.log(error, "error");
    }
  }

  async function handleAutocomplete(e, input) {
    try {
      const autocompleteData = await fetch(`${url}/locations/auto-complete?input=${e.target.value}`);

      const jsonAutocomplete = await autocompleteData.json();

      setCityZip((prev) => {
        return { ...prev, [input.name]: jsonAutocomplete };
      });
    } catch (error) {
      console.log(error, "error");
    }
  }

  function handleSelectCity(input, state) {
    setCityZip((prev) => {
      return { ...prev, [input.name]: { data: [] } };
    });
    setFormState((prev) => {
      return {
        ...prev,
        [input.name]: `${
          input?.location?.cityZipLookup
            ? `${state?.City}, ${state.StateName} ${state.Zip}`
            : `${state.state}, ${state?.city} ${state.zip}`
        } `,
      };
    });
  }

  function handleAddVehicle() {
    const inputs = Array.from(document.querySelector(`#step-${id}-${activeStep}`).getElementsByTagName("input"));

    const selects = Array.from(document.querySelector(`#step-${id}-${activeStep}`).getElementsByTagName("select"));
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
    setActiveVehicle((prev) => prev + 1);
    setVehicleSelected((prev) => prev + 1);
    setFormState((prev) => {
      return {
        ...prev,
        Vehicles: [...prev.Vehicles, {}],
      };
    });
  }

  const handleClick = (e) => {
    const stepNumber = parseInt(e.target.getAttribute("step_number"));
    navigateToFormStep(stepNumber + 1, id);
  };

  function handleBack(e) {
    const stepNumber = parseInt(e.target.getAttribute("step_number"));
    /**
     * Hide all form steps.
     */
    document.querySelectorAll(`.${id}-form-step`).forEach((formStepElement) => {
      formStepElement?.classList.add("hidden");
    });

    /**
     * Show next form step
     */
    setActiveStep(stepNumber + 1);
    document.querySelector(`#step-${id}-${stepNumber + 1}`).classList?.remove("hidden");
  }

  function navigateToFormStep(stepNumber) {
    if (Array.from(document.querySelectorAll(`.${id}-form-step`)).length === stepNumber - 1) {
      return;
    }

    // Validation
    const inputs = Array.from(document.querySelector(`#step-${id}-${stepNumber - 1}`).getElementsByTagName("input"));

    const selects = Array.from(document.querySelector(`#step-${id}-${stepNumber - 1}`).getElementsByTagName("select"));
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
    setActiveStep(stepNumber);
    document.querySelector(`#step-${id}-${stepNumber}`).classList.remove("hidden");
  }

  function setInputValid(input) {
    // console.log(input, "input");
    if (!input.checkValidity()) {
      return setErrors((prev) => {
        return { ...prev, [input.name]: input.validationMessage };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, [input.name]: "" };
      });
      setFormState((prev) => {
        if (formProps.steps[activeStep - 1]?.isVehicleStep) {
          const newVehicles = formState.Vehicles.map((vehicle, index) => {
            if (index === vechicleSelected) {
              return { ...vehicle, [input.name]: input.value };
            }
            return vehicle;
          });

          return {
            ...prev,
            Vehicles: newVehicles.length > 0 ? newVehicles : [{ [input.name]: input.value }],
          };
        }
        return {
          ...prev,
          [input.name]: input.value,
        };
      });
    }
  }

  function finalInput(input) {
    let inputFinal = <></>;
    if (input?.location?.cityZipLookup || input?.location?.autoComplete) {
      // console.log(formState[input.name], "formState[input.name]");
      inputFinal = (
        <>
          <label htmlFor={`${id}-${input.name}`} className="block">
            {input.label}
          </label>
          <input
            placeholder={`${input.placeholder}`}
            name={`${input.name}`}
            id={`${id}-${input.name}`}
            type={input?.type || "text"}
            value={formState[input.name] || ""}
            onChange={(e) =>
              input?.location?.cityZipLookup ? handleCityZipLookup(e, input) : handleAutocomplete(e, input)
            }
            {...input.validations}
          />
          <div className={`bg-[#E8F2FF] shadow-auto`}>
            {cityZip[input.name]?.data.map((el, index) => (
              <div
                key={`${input.name}-${index}`}
                className="flex justify-between py-3 px-3 cursor-pointer	 text-[#49454F] hover:bg-[#D4E3FF]"
                onClick={() => handleSelectCity(input, el)}
              >
                {input?.location?.cityZipLookup && `${el?.City}, ${el.StateName} ${el.Zip}`}
                {input?.location?.autoComplete && `${el.state}, ${el?.city} ${el.zip}`}
              </div>
            ))}
          </div>
        </>
      );
    } else {
      inputFinal = (
        <>
          {input?.select ? (
            <>
              <label className="block" htmlFor={`${id}-${input.name}`}>
                {input?.label || ""}
              </label>
              <select
                className="mt-3 pl-4"
                name={input?.name || ""}
                defaultValue={formState.Vehicles.length > 0 && formState.Vehicles[vechicleSelected][input.name]}
                id={`${id}-${input.name}`}
              >
                {input.options.map((option, index) => (
                  <option value={option.value} key={`${option.value}-${index}`}>
                    {option.label}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <label className="block" htmlFor={`${id}-${input.name}`}>
                {input?.label || ""}
              </label>
              <input
                className={``}
                id={`${id}-${input.name}`}
                placeholder={`${input?.placeholder || ""}`}
                defaultValue={
                  formProps.steps[activeStep - 1].isVehicleStep
                    ? (formState.Vehicles[vechicleSelected] && formState.Vehicles[vechicleSelected][input.name]) || ""
                    : formState[input.name] || ""
                }
                name={`${input.name}`}
                type={input?.type || "text"}
                {...input?.validations}
              />
            </>
          )}
        </>
      );
    }

    return inputFinal;
  }
  return (
    <>
      <form onChange={(e) => setInputValid(e.target)}>
        {(formProps?.steps || []).map((stepForm, index) => (
          <section
            id={`step-${id}-${index + 1}`}
            className={`${componentsStyles.width} ${componentsStyles.height} ${componentsStyles.formBg} ${
              componentsStyles.formColor
            } ${index !== 0 && "hidden"} ${id}-form-step form-step`}
            key={`form-${index}`}
          >
            {formProps.isInternational && (
              <div
                className={`bg-[${formProps.international.bg}] text-[${formProps.international.color}] flex  rounded-3xl items-center justify-between mb-8	`}
              >
                <div
                  className={`${
                    !isInternational &&
                    `!bg-[${formProps?.international?.bgActive}] !border-[${formProps?.international?.borderColor}]`
                  } border border-transparent py-2.5	px-6	rounded-3xl cursor-pointer`}
                  onClick={() => setIsInternational(false)}
                >
                  <p>Domestic shipping</p>
                </div>
                <div
                  className={`${
                    isInternational &&
                    `!bg-[${formProps?.international?.bgActive}] !border-[${formProps?.international?.borderColor}]`
                  } border border-transparent  py-2.5	px-6	rounded-3xl cursor-pointer`}
                  onClick={() => setIsInternational(true)}
                >
                  <p>International</p>
                </div>
              </div>
            )}
            {formProps.isPagination && (
              <div
                className={`after:absolute flex gap-8 after:content-[''] after:w-28 after:top-${
                  formProps.isInternational ? "[112px]" : "[35px]"
                } after:h-px after:bg-[${formProps?.pagination?.bg}] mb-4`}
              >
                {Array.from(Array(formProps.steps.length).keys()).map((step) => (
                  <div
                    key={`pagination-${step}`}
                    className={`${
                      activeStep === step + 1
                        ? `bg-[${formProps?.pagination?.bgActive}]`
                        : `bg-[${formProps?.pagination?.bg}]`
                    } w-5	h-5 rounded-full	flex items-center justify-center z-10`}
                  >
                    <p className={`text-xs text-[${formProps?.pagination?.color}]`}>{step + 1}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-between items-center">
              <h2 className="font-normal text-2xl	">{activeStep === 1 ? formProps.title : stepForm?.title || ""}</h2>
              <p className="form-stepper-circle w-9	">
                {index + 1} / {formProps.steps.length}
              </p>
            </div>
            <div className={`${componentsStyles?.sectionHeight} mt-3`}>
              {formProps.steps[activeStep - 1].isVehicleStep ? (
                <>
                  {Array.from(Array(activeVehicle + 1).keys()).map((vehicle) => (
                    <div
                      key={`vehicleContainer-${vehicle}`}
                      className={`${vechicleSelected !== vehicle ? "h-20 overflow-hidden" : "h-auto"}`}
                    >
                      {stepForm.steps.map((input, index) => (
                        <div key={`${input.name}-${index}`}>
                          {vechicleSelected !== vehicle ? (
                            <div
                              className="flex relative cursor-pointer mt-3.5"
                              onClick={() => setVehicleSelected(vehicle)}
                            >
                              <input
                                defaultValue={`${
                                  Object.values(formState.Vehicles[vehicle]).length === stepForm.steps.length
                                    ? "✅"
                                    : "❌"
                                }   ${formState.Vehicles[vehicle]?.vehicleMake || ""} ${
                                  formState.Vehicles[vehicle]?.vehicleYear || ""
                                }`}
                                className="!mb-2 cursor-pointer"
                              />
                              <span className="right-3.5 top-3.5 absolute text-sm">▼</span>
                            </div>
                          ) : (
                            <>
                              {input.customElement ? (
                                <div className="mt-3">{input.customElement}</div>
                              ) : (
                                finalInput(input)
                              )}
                            </>
                          )}

                          <span className="text-red-600 text-xs	">{errors[input.name]}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {stepForm.steps.map((input, index) => (
                    <div key={`${input.name}-${index}`}>
                      {input.customElement ? <div className="mt-3">{input.customElement}</div> : finalInput(input)}

                      <span className="text-red-600 text-xs	">{errors[input.name]}</span>
                    </div>
                  ))}
                </>
              )}
              {stepForm.isAddVehicle && (
                <button className="my-6" onClick={handleAddVehicle} type="button">
                  &#43; Add more vehicles
                </button>
              )}
            </div>
            <div className="mt-3">
              <div className="flex justify-between">
                <button
                  className={`${componentsStyles.buttonBg} ${index === 0 && `bg-white text-[#006EF7]`} ${
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
    buttonBg: `${`bg-[${formProps?.bgButton ? formProps?.bgButton : "#4361ee"}]`}`,
    buttonColor: `text-[${formProps?.colorButton ? formProps?.colorButton : "#fffff"}]`,
    height: `min-h-[${formProps.height || 468}px]`,
    width: `min-w-[${formProps.width || 384}px]`,
    sectionHeight: `min-h-[${formProps.height ? formProps.height / 1.6 : 264}px]`,
  };

  const root = ReactDOM.createRoot(document.getElementById(id));
  root.render(<window.Form formProps={formProps} id={id} componentsStyles={componentsStyles} />);
};
