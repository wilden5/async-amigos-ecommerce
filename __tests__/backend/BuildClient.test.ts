import { ctpClient } from "../../src/backend/ctpClient/BuildClient";

describe('ctpClient', () => {
  it('should be defined', () => {
    expect(ctpClient).toBeDefined();
  });

  it('should have the execute method', () => {
    expect(ctpClient.execute).toBeDefined();
  });
});