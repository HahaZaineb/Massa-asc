import { scheduleExecution } from '../contracts/main';
import { setDeployContext } from '@massalabs/massa-as-sdk';

describe('Massa Autonomous Smart Contract Tests', () => {
  beforeAll(() => {
    setDeployContext(); // Set up the environment
  });

  test('should schedule execution without errors', () => {
    expect(() => scheduleExecution(new StaticArray<u8>(0))).not.toThrow();
  });
});
