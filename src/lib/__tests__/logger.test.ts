describe("logger", () => {
  it("exports a logger instance", () => {
    const { logger } = require("../logger");
    
    expect(logger).toBeDefined();
    expect(logger.info).toBeDefined();
    expect(logger.error).toBeDefined();
  });
});
