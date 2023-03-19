module.exports = {
  // 是否显示覆盖率报告 
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*'],
  // 覆盖率的阈值  
  coverageThreshold: {
    //  全局配置 
    global: {
      statements: 90, // 语句
      functions: 90,// 函数
      branches: 90,// 分支
    }
  }
}