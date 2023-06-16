# shiplux-form-library
a library to do forms faster

This CDN works with the react, tailwind and Babel CDN.

So in your Head HTML you will need: 
 <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>

 <!-- external script -->
 <script
    crossorigin
    src="https://unpkg.com/react@18/umd/react.development.js"
 ></script>
 <script
    crossorigin
    src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
  ></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  
  And in place that you want your form paste this: 
  
  <div id="shiplux-form"></div>
  
  The ID can be whatever you want.
  
  Then, create an js file, for example: 
  <script type="text/babel" src="./js/index.js" crossorigin></script>
  
  And call the windows function to create the form:
  
  const state = window.renderForm(formProps, "shiplux-form");
  
  You will need the form props to create the form. this is an example:
  
  # Example
  
  const formProps = {
  background: "",
  color: "",
  title: "Title form",
  width: 384,
  height: 468,
  steps: [
    [
      {
        label: "Shipment mehotd",
        placeholder: "first",
        name: "shipping_method",
        validations: { required: true },
      },
      {
        label: "second mehotd",
        placeholder: "Second",
        name: "second_method",
        validations: { required: true },
      },
      {
        label: "thrid mehotd",
        placeholder: "third",
        name: "thrid_method",
      },
    ],
    [
      {
        label: "test method",
        placeholder: "two",
        name: "shipping_method",
      },
    ],
    [
      {
        label: "three",
        placeholder: "three ",
        name: "shipping_method",
      },
    ],
  ],
};
  
  # API:
  background?: string
  
  color?: string
  
  title?: string
  
  width: number
  
  height: number
  
  steps: [
    [
      {
        label: string,
        placeholder?: string,
        name: string,
        validations?: { 
          required?: boolean,
          min?: number,
          max?: number,
        },
      }
    ],
  ],
 

  
  
