const OrderHistoryError = () => {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-sm font-semibold text-red-700">
          We couldn&apos;t load your order history.
        </p>
  
        <p className="mt-2 text-xs text-red-600/70">
          Please refresh the page and try again.
        </p>
      </div>
    );
  };
  
  export default OrderHistoryError;