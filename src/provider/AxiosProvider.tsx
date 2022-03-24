import React, { FC, ReactNode, useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const AxiosContextProgress = React.createContext<number>(0);
interface Props {
  children: ReactNode;
}
const AxiosProvider: FC<Props> = ({ children }) => {
  const { getAccessTokenSilently, user } = useAuth0();
  console.log(user)

  const [uploadProgress, setUploadProgress] = useState<number>(0);

  Axios.interceptors.request.use(async (config) => {
    config.onUploadProgress = (progressEvent) =>
      setUploadProgress(progressEvent.loaded);

    const accessToken = await getAccessTokenSilently();
    
    config!.headers!.Authorization = `Bearer ${accessToken}`;
    // config!.headers!.XUserId = 'Auth0User';
    // config!.headers!.XOrgId = 'Auth0Org';

    
    return config;
  });

  Axios.interceptors.response.use(
    function (response) {
      setUploadProgress(0);
      return response;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return (
    <AxiosContextProgress.Provider value={uploadProgress}>
      {children}
    </AxiosContextProgress.Provider>
  );
};

AxiosProvider.defaultProps = {};

AxiosProvider.propTypes = {
  // getAccessTokenSilently: PropTypes.func.isRequired,
  // instance: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export default AxiosProvider;
