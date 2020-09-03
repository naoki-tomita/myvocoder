declare class AudioWorkletProcessor {
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: any): boolean
}

// my-worklet.js
// AudioWorkletGlobalScopeになってる
class MyWorkletProcessor extends AudioWorkletProcessor {
  // AudioParamsの指定
  static get parameterDescriptors () {
      return [{
          name: 'dummy',
          defaultValue: 0.5,
          minValue: 0,
          maxValue: 1,
          automationRate: "k-rate"
      }];
  }

  process(inputs: Float32Array[][], outputs: Float32Array[][], _: any): boolean {
    for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < inputs[i].length; j++) {
        for (let k = 0; k < inputs[i][j].length; k++) {
          outputs[i][j][k] = inputs[i][j][k];
        }
      }
    }
    return true;
  }
}

declare function registerProcessor(key: string, clazz: any): void;
// WebComponentsみたいに登録する
registerProcessor('my-worklet', new MyWorkletProcessor());
