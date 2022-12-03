const Spinner = () => {
    return (
  <div class="flex justify-center items-center space-x-2">
    <div
      class="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-blue-600"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <div
      class="
      spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0
        text-purple-500
      "
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <div
      class="
      spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0
        text-green-500
      "
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <div
      class="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-red-500"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <div
      class="
      spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0
        text-yellow-500
      "
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <div
      class="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-blue-300"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <div
      class="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-gray-300"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
    );
};


export default Spinner;
