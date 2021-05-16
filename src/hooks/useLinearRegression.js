import * as tf from '@tensorflow/tfjs';
import { useEffect, useState } from 'react';

const useLinearRegression = (dots) => {
  const [result, setResult] = useState([]);
  const [trainX, trainY] = dots.reduce(
    (accumulator, currentDot) => {
      accumulator[0].push(currentDot[0]);
      accumulator[1].push(currentDot[1]);
      return accumulator;
    },
    [[], []],
  );
  useEffect(() => {
    if (trainX.length !== 0) {
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      // model compile
      model.compile({ loss: 'meanSquaredError', optimizer: 'SGD' });
      // training data
      const xs = tf.tensor(trainX, [trainX.length]);
      const ys = tf.tensor(trainY, [trainY.length]);
      const fitParam = {
        epochs: 300,
        shuffle: true,
      };
      // Model training
      model.fit(xs, ys, fitParam).then(() => {
        // Test data Inference
        setResult([
          model.predict(tf.tensor([0])).dataSync() * 600,
          model.predict(tf.tensor([1])).dataSync() * 600,
        ]);
      });
    }
  }, [dots]);

  return result;
};

export default useLinearRegression;