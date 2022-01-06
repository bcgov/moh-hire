import { Logger } from '@nestjs/common';
import axios from 'axios';
import yaml from 'js-yaml';

const webhookUrl = process.env.SLACK_ALERTS_WEBHOOK_URL;

export default function postToSlack(data: unknown): void {
  if (webhookUrl) {
    axios.post(
      webhookUrl,
      {
        text: `${'```'}${yaml.dump(data)}${'```'}`,
      },
      {
        timeout: 5000,
      },
    );
  } else {
    Logger.warn('SLACK_ALERTS_WEBHOOK_URL not available, Slack alert not sent', 'postToSlack');
  }
}
