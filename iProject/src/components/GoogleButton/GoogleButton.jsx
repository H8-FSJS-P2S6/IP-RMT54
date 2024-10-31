import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import serverAPI from '../../api/ServerApi';

export default function GoogleButton() {
  const navigate = useNavigate();

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:'674025082159-1te8mg1bgnr5pcddnhurmgt4fmkspp0f.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large', locale: 'en'} // customization attributes
    );
    window.google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  async function handleCredentialResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    try {
      const { data } = await serverAPI.post('/google-login', null, {
        headers: {
          token: response.credential,
        },
      });
      localStorage.setItem('access_token', `Bearer ${data.access_token}`);
      navigate('/');
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  }

  return <div id="buttonDiv" className='justify-self-center mt3' ></div>;
}