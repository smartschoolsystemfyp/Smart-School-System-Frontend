/* 
*
Custom hook for getting token from session storage 
*/
const useGetToken = () => {
  try {
    const token = localStorage.getItem("token");

    return token || null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default useGetToken;
