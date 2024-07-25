import { Modal } from './Modal';

export const DefaultModal = () => {
  const Trigger = () => <p>open modal</p>;
  return (
    <>
      <Modal trigger={<Trigger />} />
      <Modal trigger={'hi'} />
    </>
  );
};
