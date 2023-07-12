# shiplux-form-library

- [Tutorial](#Tutorial)
- [Example](#Example)
- [API](#API)

## Tutorial

a library to do forms faster

This CDN works with the react, tailwind and Babel CDN.

So in your Head HTML you will need:

```ruby
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

  # form cnd
  <script type="text/babel" src="https://unpkg.com/shiplux-form-library@1.1.12/index.js"></script>

```

And in place that you want your form paste this:

```ruby
<div id="shiplux-form"></div>
```

The ID can be whatever you want.

Then, create an js file, for example:

```ruby
<script type="text/babel" src="./js/index.js" crossorigin></script>
```

And call the windows function to create the form:

```ruby
const state = window.renderForm(formProps, "shiplux-form");
```

You will need the form props to create the form. this is an example:

## Example

```ruby
const formProps = {
background: "#D7E9FF",
color: "",
title: "International car shipping quote",
width: 392,
height: 468,
isPagination: true,
pagination: {
  bgActive: "#4E91FF",
  bg: "#738CB6",
  color: "#ffffff",
},
isInternational: true,
international: {
  bg: "#ffffff",
  bgActive: "#BAD5F7",
  color: "#000000",
  borderColor: "#4E91FF",
},
steps: [
  {
    steps: [
      {
        label: "Pick Up",
        placeholder: "Select a country",
        name: "pickup",
        validations: { required: true },
        location: {
          cityZipLookup: true,
        },
      },
      {
        label: "Delivery",
        placeholder: "Select a country",
        name: "delivery",
        validations: { required: true },
        location: {
          cityZipLookup: true,
        },
      },
      {
        label: "Ship date",
        placeholder: "MM/DD/YYYY",
        name: "shipdate",
        type: "date",
      },
      {
        label: "Transport Type",
        select: true,
        name: "TransportType",
        options: [
          {
            label: "Open",
            value: 0,
          },
          {
            label: "Enclosed",
            value: 1,
          },
        ],
        validations: {
          required: true,
        },
      },
    ],
  },
  {
    title: "Step 2: Vehicles",
    isAddVehicle: true,
    isVehicleStep: true,
    steps: [
      {
        placeholder: "Type a year",
        name: "vehicleYear",
        type: "number",
        validations: {
          required: true,
        },
      },
      {
        placeholder: "Type a vehicle",
        name: "vehicleMake",
        validations: {
          required: true,
        },
      },
      {
        placeholder: "Type a model",
        name: "vehicleModel",
        validations: {
          required: true,
        },
      },
      {
        select: true,
        name: "VehicleType",
        options: [
          {
            label: "Car",
            value: "car",
          },
          {
            label: "Suv",
            value: "SUV",
          },
          {
            label: "Pickup",
            value: "pickup",
          },
          {
            label: "Van",
            value: "van",
          },
        ],
        validations: {
          required: true,
        },
      },
    ],
  },
  {
    title: "Step 3: People",
    steps: [
      {
        label: "Transport Running",
        select: true,
        name: "VehicleRunning",
        options: [
          {
            label: "Yes",
            value: 0,
          },
          {
            label: "No",
            value: 1,
          },
        ],
        validations: {
          required: true,
        },
      },
      {
        label: "First Name",
        placeholder: "Your Name",
        name: "firstName",
        validations: {
          required: true,
        },
      },
      {
        label: "Email",
        placeholder: "Your Email",
        name: "email",
        validations: {
          required: true,
        },
      },
      {
        label: "Phone Number",
        placeholder: "Your Phone",
        name: "phoneNumber",
        validations: {
          required: true,
        },
      },
    ],
  },
],
};
```

## API:

### Form

| Name            | Type                        | Optional |
| --------------- | --------------------------- | -------- |
| background      | string                      | Yes      |
| color           | string                      | Yes      |
| title           | string                      | Yes      |
| width           | number                      | Yes      |
| height          | number                      | Yes      |
| steps           | Array<{[Input]}(#Input)>    | No       |
| isPagination    | boolean                     | Yes      |
| pagination      | Object<[Options](#Options)> | Yes      |
| isInternational | boolean                     | Yes      |
| international   | Object<[Options](#Options)> | Yes      |

### Options

| Name     | Type   | Optional |
| -------- | ------ | -------- |
| bgActive | string | No       |
| bg       | string | No       |
| color    | string | No       |

### Input

| Name        | Type                              | Optional |
| ----------- | --------------------------------- | -------- |
| label       | string                            | Yes      |
| placeholder | string                            | Yes      |
| name        | string                            | No       |
| Location    | Object<[Location](#Location)>     | No       |
| select      | boolean                           | Yes      |
| options     | Array<[Option](#Option)>          | Yes      |
| validations | Object<[Validation](#Validation)> | Yes      |

### Option

| Name         | Type   | Optional |
| ------------ | ------ | -------- | --- |
| label        | string | No       |
| Value        | string | number   | No  |
| defaultValue | string | number   | Yes |

### Validation

| Name     | Type    | Optional |
| -------- | ------- | -------- |
| required | boolean | Yes      |
| min      | number  | Yes      |
| max      | number  | Yes      |

### Location

| Name          | Type    | Optional |
| ------------- | ------- | -------- |
| cityZipLookup | boolean | Yes      |
| autoComplete  | boolean | Yes      |
