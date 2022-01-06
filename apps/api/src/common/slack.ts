import { Logger } from '@nestjs/common';
import axios from 'axios';
import yaml from 'js-yaml';
import https from 'https';

const webhookUrl = process.env.SLACK_ALERTS_WEBHOOK_URL;

export default function postToSlack(data: unknown): void {
  if (webhookUrl) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    axios.post(
      webhookUrl,
      {
        text: `${'```'}${yaml.dump(data)}${'```'}`,
      },
      {
        httpsAgent: httpsAgent,
        timeout: 8000,
      },
    );
  } else {
    Logger.warn('SLACK_ALERTS_WEBHOOK_URL not available, Slack alert not sent', 'postToSlack');
  }
}
