export const initialState = {
  payment_type: "aamarpay",
  subscription_id: "",
  coupon_id: null,
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SELECT_PAYMENT_METHOD":
      return {
        ...state,
        payment_type: action.payload,
      };
    case "API_DATA_SUB_ID":
      return {
        ...state,
        // ...action.payload,
        subscription_id: action?.payload?.id,
      };
    case "API_DATA_COUPON_ID":
      return {
        ...state,
        // ...action.payload,
        coupon_id: action?.payload?.id,
      };
    default:
      return state;
  }
};
