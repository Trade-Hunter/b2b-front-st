import axios from 'axios';
class CheckoutService {
  async BeginCheckout(BeginCheckoutInput: any) {
    return new Promise((resolve, reject) => {
      axios.post(import.meta.env.VITE_AUTH_HOST + `/users/smart`, BeginCheckoutInput).then(
        (response: any) => {
          console.log('checkout service response', response);
          resolve(response.data);
        },
        (error) => {
          console.log('checkout service error', error);
          reject(error.response.data);
        },
      );
    });
  }
  AddPaymentInfo(AddPaymentInfoInput: any) {
    return Promise.resolve({ message: 'added payment info' });
    return new Promise((resolve, reject) => {
      axios.post(`https://checkout.tradehunter.app/login`, AddPaymentInfoInput).then(
        (response: any) => {
          console.log('checkout service response', response);
          resolve(response.data);
        },
        (error) => {
          console.log('checkout service error', error);
          reject(error.response.data);
        },
      );
    });
  }
  AddShippingInfo(AddShippingInfoInput: any) {
    return Promise.resolve({ message: 'added shipping info' });
    /*return new Promise((resolve, reject) => {
      axios.post(`https://checkout.tradehunter.app/login`, AddShippingInfoInput).then(
        (response: any) => {
          console.log('checkout service response', response);
          resolve(response.data);
        },
        (error) => {
          console.log('checkout service error', error);
          reject(error.response.data);
        },
      );
    });*/
  }
  Purchase(PurchaseInput: any) {
    return new Promise((resolve, reject) => {
      axios.post(`https://checkout.tradehunter.app/login`, PurchaseInput).then(
        (response: any) => {
          console.log('checkout service response', response);
          resolve(response.data);
        },
        (error) => {
          console.log('checkout service error', error);
          reject(error.response.data);
        },
      );
    });
  }
}

export default new CheckoutService();
