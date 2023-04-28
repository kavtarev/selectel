class Queue {
  queue = [];
  running = 0

  constructor(limit) {
    this.limit = limit;
  }

  enqueue(cb) {
    this.queue.push(cb);
    return this.dequeue()
  }

  dequeue() {
    if (this.running >= this.limit || this.queue.length === 0) {
      return;
    }

    const cb = this.queue.shift();
    this.running++

    return this.runCb(cb)
  }

  async runCb(cb) {
    try {
      const res = await cb()
      return res;
    } catch(e) {
      return e
    } finally {
      this.running--
      this.dequeue()
    }
  }
}

function promiseFactory(name, delay) {
  return async function() {
    console.log(`func named ${name} started`);
    await new Promise(res => setTimeout(() => res(name), delay))
    console.log(`func named ${name} finished`);
  }
}

const some = new Queue(3);

some.enqueue(promiseFactory('first', 3000));
some.enqueue(promiseFactory('second', 2000));
some.enqueue(promiseFactory('third', 1000));
some.enqueue(promiseFactory('fourth', 1000));
