export async function initiatePayment() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1500);
  });
}