const { expect } = require('chai');
const sinon = require('sinon');
const kue = require('kue');

const createPushNotificationsJobs = require('./8-job').default;

describe('createPushNotificationsJobs', () => {
  const queue = kue.createQueue();

  before(() => {
    queue.testMode.enter();
  });

  after(() => {
    queue.testMode.exit();
  });

  beforeEach(() => {
    queue.testMode.clear();
  });

  it('display a error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('not array', queue))
      .to.throw('Jobs is not an array');
  });

  it('create two new jobs to the queue', () => {
    const logSpy = sinon.spy(console, 'log');

    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs).to.have.lengthOf(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
    expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);

    expect(logSpy.calledWithMatch(/^Notification job created: /)).to.equal(true);
    logSpy.restore();
  });
});

