import { showSuccessMessage } from '../../src/bin/helper/showSuccessMessage';

describe('showSuccessMessage test', () => {
  test('Throw error when emoji is not passed', () => {
    expect(
      async () => await showSuccessMessage('', 'test-project', 'yarn')
    ).rejects.toThrow(
      new Error('Please pass emoji and projectName as argument')
    );
  });
  test('Throw error when projectName is not passed', () => {
    expect(
      async () => await showSuccessMessage('💧', '', 'yarn')
    ).rejects.toThrow(
      new Error('Please pass emoji and projectName as argument')
    );
  });
});
