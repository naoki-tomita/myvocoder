async function getUserMediaAsync() {
  return new Promise<MediaStream>((ok, ng) => navigator.getUserMedia({ audio: true }, ok, ng));
}

async function main() {
  const userMedia = await getUserMediaAsync();
  const context = new AudioContext();
  const source = context.createMediaStreamSource(userMedia);
  await context.audioWorklet.addModule("./worker.js");
  const worklet = new AudioWorkletNode(context, "my-worklet");
  source.connect(worklet);
  worklet.connect(context.destination);
  // source.connect(context.destination);
}

main();
