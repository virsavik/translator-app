import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignInModal from 'src/shared/components/SignInModal/SignInModal';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { signin } from 'src/shared/reducers/authentication';
import { StorageAPI } from 'src/shared/util/storage-util';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const isAuthenticated = !!(
    StorageAPI.local.get('authToken') || StorageAPI.session.get('authToken')
  );
  const loginSuccess = useAppSelector(state => state.authentication.loginSuccess);
  const loginError = useAppSelector(state => state.authentication.loginError);
  const showModalLogin = useAppSelector(state => state.authentication.showModalLogin);
  const [showModal, setShowModal] = useState(showModalLogin);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    if (loginSuccess) {
      toast.success('Login successful!');
      handleClose();
    }
  }, [loginSuccess]);

  const handleSignin = (username, password, rememberMe = false) =>
    dispatch(signin(username, password, rememberMe));

  const handleClose = () => {
    setShowModal(false);
    // history.push('/');
    navigate(-1);
  };

  // const { from } = (location.state as any) || { from: { pathname: '/', search: location.search } };
  // if (isAuthenticated) {
  //   return <Navigate to={from} />;
  // }
  return (
    <SignInModal
      showModal={showModal}
      handleLogin={handleSignin}
      handleClose={handleClose}
      loginError={loginError}
    />
  );
};
export default LoginPage;
