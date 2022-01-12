interface InstructionStep {
  image: string,
  description: string
}

export interface ICalibrationConfig {
  preConditions: {
    durationInSeconds: number,
    // Maximal dB(A) which allows calibration
    maximalBackgroundNoise?: number
  },
  analysis: {
    // Duration in seconds that is used for recording analysis data
    durationInSeconds: number
  },
  postConditions: {},
  instructions: {
    steps: Array<InstructionStep>
  }
}
