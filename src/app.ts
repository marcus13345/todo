import { ProcessManager } from 'ipc-tower';

console.log('hello template!');

ProcessManager.on('reload', () => {
  ProcessManager.restart();
})