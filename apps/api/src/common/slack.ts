import { Logger } from '@nestjs/common';
import axios from 'axios';
import yaml from 'js-yaml';
import https from 'https';

const webhookUrl = process.env.SLACK_ALERTS_WEBHOOK_URL;

export default function postToSlack(data: unknown): void {
  if (webhookUrl) {
    let response: unknown = null;
    const source = axios.CancelToken.source();
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      timeout: 20000,
    });
    setTimeout(() => {
      if (response === null) {
        source.cancel();
      }
    }, 20000); // connection timeout here in ms (5 seconds)
    response = axios.post(
      webhookUrl,
      {
        text: `${'```'}${yaml.dump(data)}${'```'}`,
      },
      {
        httpsAgent: httpsAgent,
        timeout: 20000,
        cancelToken: source.token,
      },
    );
  } else {
    Logger.warn('SLACK_ALERTS_WEBHOOK_URL not available, Slack alert not sent', 'postToSlack');
  }
}
