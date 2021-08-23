import { Box, render, Text, useApp, useInput, useStdin } from 'ink';
import { ProcessManager } from 'ipc-tower';
import mongoose from 'mongoose';
import React from 'react';
import { useEffect, useState } from 'react';
import Multiview from './Multiview';
import TaskView from './TaskView';
import NewTask from './NewTask';
import ansi from 'sisteransi';
import useStdoutDimensions from 'ink-use-stdout-dimensions';
import { appendFileSync } from 'fs';
process.stdout.write('\x1b[?1049h');

ProcessManager.on('reload', () => {
  console.log('got reload request');
  ProcessManager.restart();
});

ProcessManager.on('shutdown', () => {
  process.stdout.write('\x1b[?1049l');
});

const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false);
    }
  });

  return mounted;
}

const App = () => {
  const [connected, setConnected] = useState(false);
  const [columns, rows] = useStdoutDimensions();
  const { exit } = useApp();

  useEffect(() => {
    ProcessManager.on('shutdown', () => {
      console.log('rcvd shutdown in app element')
      exit();
    });
  }, []);
  
  useEffect(() => {
    mongoose.connect('mongodb+srv://todo:todo@cluster0.phn2o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => new Promise(res => setTimeout(res, 1000))).then(() => {
      setConnected(true);
    })
  }, []);

  process.stdout.write(ansi.cursor.to(0, 0));

	return (
    <Box
      height={rows}
      width={columns}
    >
      {!connected &&
        <Box
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <Text>Connecting to Task Database...</Text>
        </Box>
      ||
        <Multiview
          screens={[
            {
              name: 'Board',
              component: <TaskView />
            },
            {
              name: 'Board 2',
              component: <NewTask />
            }
          ]}
        />
      }
    </Box>
  );;;
};

// import readline from 'readline';
// const reader = readline.createInterface({
//   input: process.stdin,

//   output: process.stdout,

//   terminal: false
// });

// reader.on('line', function (line) {
//   console.log(line);
// });

// const instance = 
render(<App />);
// ProcessManager.on('shutdown', () => {
//   instance.unmount();
// });