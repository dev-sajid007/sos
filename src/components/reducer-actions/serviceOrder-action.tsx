export const initialState = {
  data: {
    payment_type: "aamarpay",
    service_package_id: "",
    vendor_service_id: "",
    details: "",
    files: [],
    files_url: [],
  },
  required: {
    details: true,
    files: true,
  },
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SELECT_PAYMENT_METHOD":
      return {
        ...state,
        data: {
          ...state.data,
          payment_type: action.payload,
        },
      };
    case "INPUT":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: action.payload.value,
        },
        required: {
          ...state.required,
          [action.payload.name]: action.payload.value.trim() ? false : true,
        },
      };
    case "API_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          vendor_service_id: action?.payload?.query?.orderId?.[0],
          service_package_id: action?.payload?.query?.orderId?.[1],
        },
      }; // case "API_DATA":
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       vendor_service_id: action?.payload?.[1],
    //     },
    //   };
    case "MULTI_FILE":
      let imgFile = [];
      let imgUrl = [];
      for (let i = 0; i < action.payload.value.length; i++) {
        imgFile.push(action.payload.value[i]);
        imgUrl.push(URL.createObjectURL(action.payload.value[i]));
      }
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: imgFile,
          [action.payload.url]: imgUrl,
        },
        required: {
          ...state.required,
          files: false,
        },
      };
    default:
      return state;
  }
};
