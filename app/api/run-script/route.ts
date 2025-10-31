// app/api/run-script/route.ts

import { spawn } from 'child_process';
import { NextResponse } from 'next/server';

export async function GET() {
  return new Promise((resolve) => {
    const child = spawn('echo', ['Hello from child process!']); // You can replace with your command

    let output = '';

    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(NextResponse.json({ success: true, output, code }));
    });
  });
}
