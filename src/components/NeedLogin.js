import { useWeb3Modal } from "@web3modal/react";
import { useTranslation } from "react-i18next";

export default function NeedLogin() {
  const { t } = useTranslation();
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useWeb3Modal();

  function onConnectClick() {
    if (isModalOpen) {
      closeModal();
    } else {
      openModal();
    }
  }

  return (
    <div className='no-login-wrapper'>
      <div className='no-login-container'>
        <h2>Please, connect your wallet to see this page.</h2>
        <button onClick={onConnectClick}>{t('connectwallet')}</button>
      </div>
    </div>
  );
}
