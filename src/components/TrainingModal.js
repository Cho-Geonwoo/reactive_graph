import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Default } from 'react-awesome-spinners';
import {
  ModalWrapper,
  DefaultWrapper,
  OnTrainingText,
  MainWrapper,
  MainWrapperTwo,
  RobotImg,
  CompressImg,
} from '../styles/styles';

const TrainingModal = ({ width }) => {
  const isMobile = useMemo(() => width <= 1200, [width]);
  const onTrain = useSelector((store) => store.answer.onTrain);
  const [minimized, setMinimized] = useState(false);
  const [hideModal, setHideModal] = useState(false);

  useEffect(() => {
    if (minimized) {
      setTimeout(() => setHideModal(true), 800);
    }
  }, [minimized]);

  // training이 끝나면 minimize mode를 해제시켜 modal을 원래 상태로 복귀시킵니다.
  useEffect(() => {
    if (!onTrain) {
      setMinimized(false);
      setHideModal(false);
    }
  }, [onTrain]);

  // redux store에 있는 상태가 학습 중이면, training modal을 띄우는 부분입니다.
  return (
    onTrain &&
    (!hideModal ? (
      <MainWrapper>
        <ModalWrapper minimized={minimized}>
          <CompressImg
            src={`${process.env.PUBLIC_URL}/images/compress.png`}
            alt="compress"
            onClick={() => {
              setMinimized(true);
            }}
          />
          <RobotImg
            src={`${process.env.PUBLIC_URL}/images/robot.png`}
            alt="robot"
          />
          <OnTrainingText>데이터를 학습 중입니다.</OnTrainingText>
          <Default />
        </ModalWrapper>
      </MainWrapper>
    ) : (
      <MainWrapperTwo>
        <DefaultWrapper>
          {isMobile ? (
            <div>
              <Default />
            </div>
          ) : (
            <div style={{ paddingTop: '30px', paddingRight: '30px' }}>
              <Default />
            </div>
          )}
        </DefaultWrapper>
      </MainWrapperTwo>
    ))
  );
};

export default TrainingModal;
