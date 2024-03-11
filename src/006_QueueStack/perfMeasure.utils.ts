export function measurePerf(taskDescription = "", task: (iter: number) => void): Promise<void> {
  return new Promise((resolve) => [
    setTimeout(() => {
      const timer = process.hrtime();

      for (let i = 0; i < 100; i++) {
        task(i);
      }

      const elapsed = process.hrtime(timer);
      const elapsedMili = elapsed[0] * 1000 + elapsed[1] / 1000000;
      console.log(`>>> ${taskDescription} Finished: ${elapsedMili.toFixed(3)}ms elapsed`);

      resolve();
    }, 500),
  ]);
}
